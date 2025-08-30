import { PlanStatus } from "@prisma/client";

type ParentPlan = {
    parentPlanId: string;
    userId: string;
    planName: string;
    planThumbnail: string | null;
    startDateTime: Date;
    endDateTime: Date;
    purpose: string | null;
    status: PlanStatus;
    startAreaId: string;
    endAreaId: string;
    conceptId: string;
    createdAt: Date;
    updatedAt: Date;
};

type ChildPlan = {
    childPlanId?: string;
    parentPlanId: string;
    order: number;
    locationName: string;
    checkInTime: Date | null;
    checkOutTime: Date | null;
    memo: string | null;
    userId: string;
};

type ParentAndChildPlan = {
    parentPlan: ParentPlan;
    childPlans: ChildPlan[];
};

export { ParentPlan, ChildPlan, ParentAndChildPlan };
