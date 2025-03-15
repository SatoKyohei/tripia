import ChildPlan from "@/components/layouts/ChildPlan";

// テーブル
type PlanStatus = "Draft" | "Published" | "Completed";

export type ParentPlan = {
    parentPlanId: string;
    authorId: string;
    conceptName: string;
    planName: string;
    planThumbnail: string | null;
    startAreaName: string;
    endAreaName: string;
    startPrefectureName: string;
    endPrefectureName: string;
    startDateTime: string;
    endDateTime: string;
    purpose: string | null;
    status: PlanStatus;
};

export type ChildPlan = {
    childPlanId: string;
    parentPlanId: string;
    order: number;
    locationName: string;
    checkInTime: string | null;
    checkOutTime: string | null;
    memo: string | null;
};

export type PlanWithChildren = {
    parentPlan: ParentPlan | null;
    childPlans: ChildPlan[] | null;
}

// コンポーネント
export type DateTimePicker = {
    label?: string;
    startDateTime?: string;
    endDateTime?: string;
};

export type DateTimePickerGroups = {
    label?: string;
    dateTime?: string;
};
