type PlanStatus = "Draft" | "Published" | "Completed";

export type ParentPlan = {
    parentPlanId: string;
    authorId: string;
    conceptId: string;
    planName: string;
    planThumbnail: string | null;
    startAreaId: string;
    endAreaId: string;
    startDateTime: string;
    endDateTime: string;
    purpose: string | null;
    status: PlanStatus;
    createdAt: string;
    updatedAt: string;
};