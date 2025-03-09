import { ParentPlan, PlanStatus, User } from "@prisma/client";
import { prisma } from "../lib/PrismaClient";
import { Body, Controller, Get, Post, Request, Response, Route, Security } from "tsoa";
import { ValidateErrorJSON } from "../types/types";
import { AuthenticateRequest } from "../middleware/authenticate";

type ParentPlanParams = {
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

type ParentPlanReturn = {
    parentPlanId: string;
    authorId: string;
    conceptName: string;
    planName: string;
    planThumbnail: Uint8Array | null;
    startDateTime: Date;
    endDateTime: Date;
    purpose: string | null;
    status: PlanStatus;
    startAreaName: string;
    startPrefectureName: string;
    endAreaName: string;
    endPrefectureName: string;
};

type ParentPlanResponse = {
    parentPlan: ParentPlanReturn;
    allAreaNames: string[]
    allPrefectureNames: string[]
};

// type PlanUpdateParams = Pick<
//     ParentPlan,
//     "planName" | "planThumbnail" | "startDateTime" | "endDateTime" | "purpose" | "status"
// >;

// type ParentPlanWithAuthor = ParentPlanParams & { author: User };

@Route("plans")
// @Security("jwt")
export class PlanController extends Controller {
    @Response<ValidateErrorJSON>(500, "Internal Server Error")
    @Get() public async getAllParentPlans(): Promise<ParentPlan[] | { message: string }> {
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
    ): Promise<ParentPlanResponse | { message: string }> {
        try {
            const parentPlanData = await prisma.parentPlan.findUnique({
                where: {
                    parentPlanId,
                },
            });

            const startArea = await prisma.area.findUnique({
                where: {
                    areaId: parentPlanData?.startAreaId,
                },
            });

            const startPrefecture = await prisma.prefecture.findUnique({
                where: {
                    prefectureId: startArea?.prefectureId,
                },
            });

            const endArea = await prisma.area.findUnique({
                where: {
                    areaId: parentPlanData?.endAreaId,
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

            const allAreas = await prisma.area.findMany();
            const allPrefectures = await prisma.prefecture.findMany();

            if (
                !parentPlanData ||
                !startArea ||
                !endArea ||
                !startPrefecture ||
                !endPrefecture ||
                !concept ||
                !allAreas ||
                !allPrefectures
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
                startAreaName: startArea?.areaName,
                startPrefectureName: startPrefecture?.prefectureName,
                endAreaName: endArea?.areaName,
                endPrefectureName: endPrefecture?.prefectureName,
            };

            const allAreaNames = allAreas.map((area) => area.areaName);
            const allPrefectureNames = allPrefectures.map(
                (prefecture) => prefecture.prefectureName,
            );

            return { parentPlan, allAreaNames, allPrefectureNames };
            
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
        @Body() requestBody: ParentPlanParams,
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
}
