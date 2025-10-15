import prisma from "../lib/PrismaClient";
import { ParentAndChildPlan, ParentPlan } from "../types/planTypes";
import { childPlanService } from "./childPlanService";

export const parentPlanService = {
    /**
     * プラン一覧を取得するサービス関数
     * @param userId ユーザーID
     * @returns ParentPlan[]
     */
    async getAllParentPlans(userId: string): Promise<ParentPlan[]> {
        return await prisma.parentPlan.findMany({
            where: {
                userId,
            },
        });
    },

    /**
     * 特定の親プランとそれに紐づく子プランを取得するサービス関数
     * @param parentPlanId 親プランID
     * @returns 親プランと子プランのデータ
     */
    async getParentAndChildPlans(parentPlanId: string): Promise<ParentAndChildPlan> {
        const parentPlan = await prisma.parentPlan.findUnique({
            where: { parentPlanId },
        });

        if (!parentPlan) {
            throw new Error("親プランが見つかりません");
        }

        const childPlans = await prisma.childPlan.findMany({
            where: { parentPlanId },
        });

        return { parentPlan, childPlans };
    },

    /**
     * 親プランを作成するサービス関数
     * @param userId ユーザーID
     * @param requestBody リクエストボディ
     * @returns ParentPlan
     */
    async createParentPlan(userId: string, requestBody: ParentPlan): Promise<ParentPlan> {
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

        if (planName === null) {
            throw new Error("プラン名はnullにできません");
        }

        const newParentPlan = await prisma.parentPlan.create({
            data: {
                userId,
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

        return newParentPlan;
    },

    /**
     * 親プランを更新するサービス関数
     * @param userId ユーザーID
     * @param requestBody リクエストボディ
     * @return void
     */
    async updateParentPlan(userId: string, requestBody: ParentPlan): Promise<void> {
        const {
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

        const existingParentPlan = await prisma.parentPlan.findUnique({
            where: { parentPlanId },
        });

        if (!existingParentPlan) {
            throw new Error(`ParentPlan (id: ${parentPlanId}) が存在しません。`);
        }

        await prisma.parentPlan.update({
            where: { parentPlanId },
            data: {
                userId,
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
    },

    /**
     * 親プランとそれに紐づく子プランを削除するサービス関数
     * @param parentPlanId 親プランID
     * @returns void
     */
    async deleteParentPlan(parentPlanId: string): Promise<void> {
        const childPlanIdsWithParentPlan = await prisma.childPlan.findMany({
            where: {
                parentPlanId,
            },
            select: {
                childPlanId: true,
            },
        });

        const childPlanIds = childPlanIdsWithParentPlan.map(
            (id: { childPlanId: string }) => id.childPlanId,
        );

        await prisma.childPlan.deleteMany({
            where: {
                childPlanId: {
                    in: childPlanIds,
                },
            },
        });

        await prisma.parentPlan.delete({ where: { parentPlanId } });
    },

    /**
     * 親プランを複製するサービス関数
     * @param parentPlanId 親プランID
     * @returns 複製された親プラン情報
     */
    async duplicateParentPlan(parentPlanId: string): Promise<{ parentPlanId: string }> {
        const duplicateParentPlan = await prisma.parentPlan.findUnique({
            where: {
                parentPlanId,
            },
            select: {
                planName: true,
                userId: true,
                planThumbnail: true,
                startDateTime: true,
                endDateTime: true,
                purpose: true,
                status: true,
                startAreaId: true,
                endAreaId: true,
                conceptId: true,
            },
        });

        if (!duplicateParentPlan) {
            throw new Error("Parent plan not found");
        }

        const duplicateParentPlanName = `${duplicateParentPlan.planName} - コピー`;

        const newParentPlan = await prisma.parentPlan.create({
            data: {
                ...duplicateParentPlan,
                planName: duplicateParentPlanName,
            },
            select: {
                parentPlanId: true,
            },
        });

        const newParentPlanId = newParentPlan.parentPlanId;

        await childPlanService.duplicateChildPlansToOtherParentPlan(
            parentPlanId,
            newParentPlanId,
            duplicateParentPlan.userId,
        );

        return newParentPlan;
    },
};
