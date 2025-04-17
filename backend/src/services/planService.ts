import { PlanStatus } from "@prisma/client";
import { prisma } from "../lib/PrismaClient";

type ParentPlanParams = {
    parentPlanId: string;
    planName: string;
    planThumbnail?: Uint8Array | null;
    startDateTime: Date;
    endDateTime: Date;
    purpose: string | null;
    status: PlanStatus;
    startAreaId: string;
    endAreaId: string;
    conceptId: string;
};

type childPlan = {
    childPlanId?: string;
    parentPlanId: string;
    order: number;
    locationName: string;
    checkInTime: Date | null;
    checkOutTime: Date | null;
    memo: string | null;
};

export const childPlanService = {
    async duplicateChildPlanToSameParentPlan(
        childPlanId: string,
    ): Promise<Omit<childPlan, "createdAt" | "updatedAt">> {
        const duplicateChildPlan = await prisma.childPlan.findUnique({
            where: {
                childPlanId,
            },
        });

        if (!duplicateChildPlan) {
            throw new Error("Child plan not found");
        }

        const parentPlanId = duplicateChildPlan?.parentPlanId;

        // 複製した子プランのorderより大きいorderの他子プランのorderをすべて+1
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
                locationName: duplicateChildPlan.locationName,
                checkInTime: duplicateChildPlan?.checkInTime,
                checkOutTime: duplicateChildPlan?.checkOutTime,
                memo: duplicateChildPlan?.memo,
            },
        });

        const { createdAt: _createdAt, updatedAt: _updatedAt, ...newChildPlan } = response;

        return newChildPlan;
    },

    async duplicateChildPlanToAnotherParentPlan(
        parentPlanId: string,
    ): Promise<Omit<ParentPlanParams, "createdAt" | "updatedAt">> {
        const duplicateParentPlan = await prisma.parentPlan.findUnique({
            where: {
                parentPlanId,
            },
            select: {
                planName: true,
                authorId: true,
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
                planName: true,
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

        const newParentPlanId = newParentPlan.parentPlanId;

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

        for (let i = 0; childPlans.length > i; i++) {
            await prisma.childPlan.create({
                data: {
                    parentPlanId: newParentPlanId,
                    order: childPlans[i].order,
                    locationName: childPlans[i].locationName,
                    checkInTime: childPlans[i].checkInTime,
                    checkOutTime: childPlans[i].checkOutTime,
                    memo: childPlans[i].memo,
                },
            });
        }

        return newParentPlan;
    },
};
