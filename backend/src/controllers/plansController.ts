import { PlanStatus } from "@prisma/client";
import { prisma } from "../lib/PrismaClient";
import {
    Body,
    Controller,
    Delete,
    Get,
    Path,
    Post,
    Put,
    Request,
    Response,
    Route,
    Security,
} from "tsoa";
import { ValidateErrorJSON } from "../types/types";
import { AuthenticateRequest } from "../middleware/authenticate";
import { childPlanService } from "../services/planService";

type ParentPlan = {
    parentPlanId: string;
    authorId: string;
    planName: string;
    planThumbnail: string | null;
    startDateTime: Date;
    endDateTime: Date;
    purpose: string | null;
    status: PlanStatus;
    startAreaId: string;
    endAreaId: string;
    conceptId: string;
};

type ChildPlan = {
    childPlanId?: string;
    parentPlanId: string;
    order: number;
    locationName: string;
    checkInTime: Date | null;
    checkOutTime: Date | null;
    memo: string | null;
};

type ParentAndChildPlan = {
    parentPlan: ParentPlan;
    childPlans: ChildPlan[];
};

@Route("plans")
// @Security("jwt")
export class PlanController extends Controller {
    @Response<ValidateErrorJSON>(500, "Internal Server Error")
    @Get()
    public async getAllParentPlans(): Promise<ParentPlan[] | { message: string }> {
        try {
            const parentPlans = await prisma.parentPlan.findMany();
            return parentPlans;
        } catch (error) {
            this.setStatus(500);
            console.error(error);
            return { message: "Failed to retrieve plans" };
        }
    }

    @Response<ValidateErrorJSON>(400, "Plan Not Found")
    @Get("{parentPlanId}")
    public async getParentPlan(
        parentPlanId: string,
    ): Promise<ParentAndChildPlan | { message: string }> {
        try {
            const parentPlan = await prisma.parentPlan.findUnique({
                where: {
                    parentPlanId,
                },
            });

            const childPlans = await prisma.childPlan.findMany({
                where: {
                    parentPlanId,
                },
                orderBy: { order: "asc" },
            });

            if (!parentPlan || !childPlans) {
                this.setStatus(404);
                return { message: "Failed to retrieve plans" };
            }

            return { parentPlan, childPlans };
        } catch (error) {
            this.setStatus(500);
            console.error(error);
            return { message: "Failed to retrieve plans" };
        }
    }

    @Response<ValidateErrorJSON>(400, "Invalid requests")
    @Response<ValidateErrorJSON>(401, "Unauthorized")
    @Post("create")
    public async createParentPlan(
        @Request() request: AuthenticateRequest,
        @Body() requestBody: Omit<ParentPlan, "parentPlanId" | "authorId">,
    ): Promise<{ message?: string } | { message?: string; parentPlanId: string } | void> {
        const {
            planName,
            planThumbnail,
            startDateTime,
            endDateTime,
            purpose,
            status,
            startAreaId,
            endAreaId,
            conceptId,
        } = requestBody;

        // 課題：認証の実装ができておらず、ダミーのauthorIdを指定している
        // const authorId = request.user?.userId;
        const authorId = "dummy-user-id";

        if (authorId === undefined) {
            this.setStatus(401);
            return { message: "著者IDが定義されていません" };
        }

        if (planName === null) {
            this.setStatus(400);
            return { message: "プラン名はnullにできません" };
        }

        const newParentPlan = await prisma.parentPlan.create({
            data: {
                authorId,
                planName,
                planThumbnail,
                startDateTime,
                endDateTime,
                purpose,
                status,
                startAreaId,
                endAreaId,
                conceptId,
            },
        });
        this.setStatus(201);
        return { message: "親プランを作成しました", parentPlanId: newParentPlan.parentPlanId };
    }

    @Response<ValidateErrorJSON>(400, "Invalid requests")
    @Response<ValidateErrorJSON>(401, "Unauthorized")
    @Put("update")
    public async updateParentPlan(
        @Request() request: AuthenticateRequest,
        @Body() requestBody: any,
    ): Promise<{ message?: string } | void> {
        const {
            authorId,
            parentPlanId,
            planName,
            planThumbnail,
            startDateTime,
            endDateTime,
            purpose,
            status,
            startAreaId,
            endAreaId,
            conceptId,
        } = requestBody;

        await prisma.parentPlan.update({
            where: { parentPlanId },
            data: {
                authorId,
                planName,
                planThumbnail,
                startDateTime,
                endDateTime: new Date(endDateTime),
                purpose,
                status,
                startAreaId,
                endAreaId,
                conceptId,
            },
        });
        this.setStatus(201);
    }

    @Response<ValidateErrorJSON>(400, "Invalid requests")
    @Response<ValidateErrorJSON>(401, "Unauthorized")
    @Delete("{parentPlanId}/delete")
    public async deleteParentPlan(
        @Request() request: AuthenticateRequest,
        parentPlanId: string,
    ): Promise<{ message?: string } | void> {
        try {
            const ids = await prisma.childPlan.findMany({
                where: {
                    parentPlanId,
                },
                select: {
                    childPlanId: true,
                },
            });

            const childPlanIds = ids.map((id) => id.childPlanId);

            await prisma.childPlan.deleteMany({
                where: {
                    childPlanId: {
                        in: childPlanIds,
                    },
                },
            });

            await prisma.parentPlan.delete({ where: { parentPlanId } });
        } catch (error) {
            this.setStatus(500);
            console.error(error);
            return { message: "Failed to delete plan" };
        }
    }

    @Response<ValidateErrorJSON>(400, "Invalid requests")
    @Response<ValidateErrorJSON>(401, "Unauthorized")
    @Post("duplicate")
    public async duplicateParentPlan(
        @Request() request: AuthenticateRequest,
        @Body() requestBody: { parentPlanId: string },
    ): Promise<{ message?: string }> {
        try {
            const { parentPlanId } = requestBody;
            const newParentPlan =
                await childPlanService.duplicateChildPlanToAnotherParentPlan(parentPlanId);
            return { message: "Successfully duplicated Parent plan" };
        } catch (error) {
            this.setStatus(500);
            console.error(error);
            return { message: "Failed to duplicate ParentPlan" };
        }
    }
}

@Route("child-plans")
// 課題：createをupdateと一緒にしているが、やっぱわける
// @Security("jwt")
export class ChildrenPlanController extends Controller {
    @Response<ValidateErrorJSON>(400, "Invalid Requests")
    @Response<ValidateErrorJSON>(401, "Unauthorized")
    @Post("create")
    public async createChildPlan(
        @Request() request: AuthenticateRequest,
        @Body() requestBody: ChildPlan,
    ): Promise<{ message?: string } | { message?: string; newChildPlan: ChildPlan } | void> {
        try {
            const { parentPlanId, order, locationName, checkInTime, checkOutTime, memo } =
                requestBody;

            const response = await prisma.childPlan.create({
                data: {
                    parentPlanId,
                    order,
                    locationName,
                    checkInTime,
                    checkOutTime,
                    memo,
                },
            });

            const { createdAt, updatedAt, ...newChildPlan } = response;

            this.setStatus(200);
            return { message: "Successfully created child plan", newChildPlan };
        } catch (error) {
            this.setStatus(500);
            console.error(error);
            return { message: "Failed to create plans" };
        }
    }

    @Response<ValidateErrorJSON>(400, "Invalid Requests")
    @Response<ValidateErrorJSON>(401, "Unauthorized")
    @Put("update")
    public async updateChildPlan(
        @Request() request: AuthenticateRequest,
        @Body() requestBody: ChildPlan,
    ): Promise<{ message?: string } | void> {
        try {
            const { childPlanId, order, locationName, checkInTime, checkOutTime, memo } =
                requestBody;

            await prisma.childPlan.update({
                where: {
                    childPlanId,
                },
                data: {
                    order,
                    locationName,
                    checkInTime,
                    checkOutTime,
                    memo,
                },
            });

            this.setStatus(200);
            return { message: "Successfully updated child plan" };
        } catch (error) {
            this.setStatus(500);
            console.error(error);
            return { message: "Failed to update plans" };
        }
    }

    @Response<ValidateErrorJSON>(400, "Invalid Requests")
    @Response<ValidateErrorJSON>(401, "Unauthorized")
    @Delete("{childPlanId}")
    public async deleteChildPlan(
        @Path() childPlanId: string,
    ): Promise<
        { message?: string } | { message?: string; remainingChildPlans: ChildPlan[] } | void
    > {
        try {
            const childPlan = await prisma.childPlan.findUnique({
                where: {
                    childPlanId,
                },
            });

            const parentPlanId = childPlan?.parentPlanId;

            await prisma.childPlan.delete({
                where: {
                    childPlanId,
                },
            });

            const remainingChildPlans = await prisma.childPlan.findMany({
                where: {
                    parentPlanId,
                },
                orderBy: { order: "asc" },
            });

            for (let i = 0; i < remainingChildPlans.length; i++) {
                await prisma.childPlan.update({
                    where: {
                        childPlanId: remainingChildPlans[i].childPlanId,
                    },
                    data: { order: i + 1 },
                });
            }

            return { message: "Successfully deleted child plans", remainingChildPlans };
        } catch (error) {
            this.setStatus(500);
            console.error(error);
            return { message: "Failed to retrieve plans" };
        }
    }

    @Response<ValidateErrorJSON>(400, "Invalid Requests")
    @Response<ValidateErrorJSON>(401, "Unauthorized")
    @Post("{childPlanId}/duplicate")
    public async duplicateChildPlan(
        @Path() childPlanId: string,
    ): Promise<{ message?: string } | { message?: string; newChildPlan: ChildPlan } | void> {
        try {
            const newChildPlan =
                await childPlanService.duplicateChildPlanToSameParentPlan(childPlanId);
            return { message: "Successfully duplicated child plans", newChildPlan };
        } catch (error) {
            this.setStatus(500);
            console.error(error);
            return { message: "Failed to duplicate child plan" };
        }
    }
}

// @Route("mypage")
// export class MyPageController extends Controller {
//     // @Response<ValidateErrorJSON>(400, "Invalid Requests")
//     // @Response<ValidateErrorJSON>(401, "Unauthorized")
//     // @Get()
//     // public async getMyPage(@Request() request) {
//         // const userId = request.user?.id;

//         // if (!userId) {
//         //     this.setStatus(401);
//         //     return { return: "UnAuthorized" };
//         // }

//     }
