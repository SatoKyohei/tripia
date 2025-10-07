// プランのステータスを表す型
// "Draft": 下書き状態, "Published": 公開状態
export type PlanStatus = "Draft" | "Published";

// 親プランのデータ構造を表す型
export type ParentPlanType = {
    parentPlanId: string;
    userId: string;
    conceptId: string;
    planName: string;
    planThumbnail: string | null;
    startAreaId: string;
    endAreaId: string;
    startDateTime: string;
    endDateTime: string;
    purpose: string | null;
    status: PlanStatus;
    startPrefectureName?: string;
    endPrefectureName?: string;
    startAreaName?: string;
    endAreaName?: string;
    createdAt: string;
    updatedAt: string;
};

// 子プランのデータ構造を表す型
export type ChildPlanType = {
    childPlanId: string;
    parentPlanId: string;
    order: number;
    locationName: string;
    checkInTime: string | null;
    checkOutTime: string | null;
    memo: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
};

// エリア情報を表す型
export type Area = {
    areaId: string;
    areaName: string;
};

export type Prefecture = {
    prefectureId: string;
    prefectureName: string;
};
