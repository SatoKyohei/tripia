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
    planThumbnail: Uint8Array | null;
    startDateTime: Date;
    endDateTime: Date;
    purpose: string | null;
    status: PlanStatus;
    startAreaId: string;
    endAreaId: string;
    conceptId: string;
};

type OtherPropertyOfParentPlan = {
    startAreaName: string;
    startPrefectureName: string;
    endAreaName: string;
    endPrefectureName: string;
    conceptName: string;
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
    parentPlan: ParentPlan & OtherPropertyOfParentPlan;
    childPlans: ChildPlan[];
};

type AllAreaAndPrefectureNames = {
    allAreaNames: string[];
    allPrefectureNames: string[];
};

@Route("metadata")
export class MetaDataController extends Controller {
    @Response<ValidateErrorJSON>(500, "Internal Server Error")
    @Get("location")
    public async getAllAreaNames(): Promise<
        { message?: string } | AllAreaAndPrefectureNames | void
    > {
        try {
            const allArea = await prisma.area.findMany({
                select: {
                    areaName: true,
                },
            });

            const allPrefecture = await prisma.prefecture.findMany({
                select: {
                    prefectureName: true,
                },
            });

            if (!allArea || !allPrefecture) {
                this.setStatus(404);
                return { message: "Failed to retrieve location" };
            }

            const allAreaNames = allArea.map((area) => area.areaName);
            const allPrefectureNames = allPrefecture.map((prefecture) => prefecture.prefectureName);

            this.setStatus(200);
            return { allAreaNames, allPrefectureNames };
        } catch (error) {
            this.setStatus(500);
            return { message: "Failed to retrieve location" };
        }
    }
}

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
            const parentPlanData = await prisma.parentPlan.findUnique({
                where: {
                    parentPlanId,
                },
            });

            if (
                !parentPlanData?.startAreaId ||
                !parentPlanData?.endAreaId ||
                !parentPlanData?.conceptId
            ) {
                this.setStatus(404);
                return { message: "Missing required IDs in parent plan" };
            }

            const childPlans = await prisma.childPlan.findMany({
                where: {
                    parentPlanId,
                },
                orderBy: { order: "asc" },
            });

            const startArea = await prisma.area.findUnique({
                where: {
                    areaId: parentPlanData.startAreaId,
                },
            });

            const startPrefecture = await prisma.prefecture.findUnique({
                where: {
                    prefectureId: startArea?.prefectureId,
                },
            });

            const endArea = await prisma.area.findUnique({
                where: {
                    areaId: parentPlanData.endAreaId,
                },
            });

            const endPrefecture = await prisma.prefecture.findUnique({
                where: {
                    prefectureId: endArea?.prefectureId,
                },
            });

            const concept = await prisma.concept.findUnique({
                where: {
                    conceptId: parentPlanData?.conceptId,
                },
            });

            if (
                !parentPlanData ||
                !childPlans ||
                !startArea ||
                !endArea ||
                !startPrefecture ||
                !endPrefecture ||
                !concept
            ) {
                this.setStatus(404);
                return { message: "Failed to retrieve plans" };
            }

            const parentPlan = {
                parentPlanId: parentPlanData?.parentPlanId,
                authorId: parentPlanData?.authorId,
                planName: parentPlanData?.planName,
                planThumbnail: parentPlanData?.planThumbnail,
                startDateTime: parentPlanData?.startDateTime,
                endDateTime: parentPlanData?.endDateTime,
                purpose: parentPlanData?.purpose,
                status: parentPlanData?.status,
                conceptName: concept?.conceptName,
                conceptId: parentPlanData?.conceptId,
                startAreaId: parentPlanData?.startAreaId,
                startAreaName: startArea?.areaName,
                startPrefectureName: startPrefecture?.prefectureName,
                endAreaId: parentPlanData?.endAreaId,
                endAreaName: endArea?.areaName,
                endPrefectureName: endPrefecture?.prefectureName,
            };

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
    ): Promise<{ message?: string } | void> {
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

        const authorId = request.user?.userId;

        if (authorId === undefined) {
            this.setStatus(401);
            return { message: "著者IDが定義されていません" };
        }

        if (planName === null) {
            this.setStatus(400);
            return { message: "プラン名はnullにできません" };
        }

        await prisma.parentPlan.create({
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
