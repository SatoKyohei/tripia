import prisma from "../lib/PrismaClient";
import { ChildPlan } from "../types/planTypes";

export const childPlanService = {
    /**
     * 子プランを作成するサービス関数
     * @param userId ユーザーID
     * @param requestBody リクエストボディ
     * @returns 作成された子プラン
     */
    async createChildPlan(userId: string, requestBody: any): Promise<ChildPlan> {
        const { parentPlanId, order, locationName, checkInTime, checkOutTime, memo } = requestBody;

        const response = await prisma.childPlan.create({
            data: {
                parentPlanId,
                order,
                userId,
                locationName,
                checkInTime,
                checkOutTime,
                memo,
            },
        });

        const newChildPlan = response;
        return newChildPlan;
    },

    /**
     * @param requestBody リクエストボディ
     * @returns void
     */
    async updateChildPlan(requestBody: any): Promise<void> {
        const { childPlanId, order, locationName, checkInTime, checkOutTime, memo } = requestBody;

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
    },

    /**
     * 子プランを削除するサービス関数
     * @param childPlanId 子プランID
     * @returns {ChildPlan[]} 削除後の残りの子プラン一覧
     */
    async deleteChildPlan(childPlanId: string): Promise<ChildPlan[]> {
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

        return remainingChildPlans;
    },

    /**
     * 同じ親プラン内に子プランを複製するサービス関数
     * @param childPlanId 複製する子プランID
     * @returns 複製された子プラン
     */
    async duplicateChildPlanToSameParentPlan(childPlanId: string): Promise<ChildPlan> {
        const duplicateChildPlan = await prisma.childPlan.findUnique({
            where: {
                childPlanId,
            },
        });

        if (!duplicateChildPlan) {
            throw new Error("Child plan not found");
        }

        const parentPlanId = duplicateChildPlan?.parentPlanId;

        // 複製した子プランのorderより大きい子プランのorderをすべて+1
        await prisma.childPlan.updateMany({
            where: {
                parentPlanId,
                order: { gt: duplicateChildPlan?.order },
            },
            data: {
                order: { increment: 1 },
            },
        });

        const response = await prisma.childPlan.create({
            data: {
                parentPlanId,
                order: duplicateChildPlan?.order + 1,
                userId: duplicateChildPlan.userId,
                locationName: duplicateChildPlan.locationName,
                checkInTime: duplicateChildPlan?.checkInTime,
                checkOutTime: duplicateChildPlan?.checkOutTime,
                memo: duplicateChildPlan?.memo,
            },
        });

        const newChildPlan = response;

        return newChildPlan;
    },

    /**
     * 異なる親プラン内に子プランを複製するサービス関数
     * 親プランごと複製する際に使用
     * @param parentPlanId 複製する親プランID
     * @param newParentPlanId 新しい親プランID
     * @param userId ユーザーID
     * @returns void
     */
    async duplicateChildPlansToOtherParentPlan(
        parentPlanId: string,
        newParentPlanId: string,
        userId: string,
    ): Promise<void> {
        const childPlans = await prisma.childPlan.findMany({
            where: {
                parentPlanId,
            },
            select: {
                order: true,
                locationName: true,
                checkInTime: true,
                checkOutTime: true,
                memo: true,
            },
        });

        for (const childPlan of childPlans) {
            await prisma.childPlan.create({
                data: {
                    parentPlanId: newParentPlanId,
                    userId,
                    order: childPlan.order,
                    locationName: childPlan.locationName,
                    checkInTime: childPlan.checkInTime,
                    checkOutTime: childPlan.checkOutTime,
                    memo: childPlan.memo,
                },
            });
        }
    },
};
