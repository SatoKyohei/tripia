import { ParentPlan, PlanStatus, User } from "@prisma/client";
import { prisma } from "../lib/PrismaClient";
import { Body, Controller, Get, Post, Request, Response, Route, Security } from "tsoa";
import { ValidateErrorJSON } from "../types/types";
import { AuthenticateRequest } from "../middleware/authenticate";

type PlanCreationParams = {
    planName: string;
    planThumbnail?: Uint8Array | null;
    startDateTime: Date;
    endDateTime: Date;
    purpose: string;
    status: PlanStatus;
    startAreaId: string;
    endAreaId: string;
    conceptId: string;
};

type PlanUpdateParams = Pick<
    ParentPlan,
    "planName" | "planThumbnail" | "startDateTime" | "endDateTime" | "purpose" | "status"
>;

type ParentPlanWithAuthor = ParentPlan & { author: User };

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

    @Response<ValidateErrorJSON>(400, "Invalid requests")
    @Response<ValidateErrorJSON>(401, "Unauthorized")
    @Post()
    public async createParentPlan(
        @Request() request: AuthenticateRequest,
        @Body() requestBody: PlanCreationParams,
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

    // @Response<ValidateErrorJSON>(400, "")
    // @Get("plans/{parentPlanId}")
    // public async getParentPlan(parentPlanId: string): Promise<ParentPlanWithAuthor | null> {
    //     const parentPlan = await prisma.parentPlan.findUnique({
    //         where: {
    //             parentPlanId,
    //         },
    //         include: { author: true },
    //     });
    //     if (!parentPlan) {
    //         this.setStatus(404);
    //         return null;
    //     }
    //     return parentPlan;
    // }
}
