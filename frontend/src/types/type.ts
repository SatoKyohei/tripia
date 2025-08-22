// テーブル
export type PlanStatus = "Draft" | "Published";

export type ParentPlan = {
    parentPlanId: string;
    userId: string;
    conceptName: string;
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

export type ParentPlanParams = {
    parentPlanId: string;
    userId: string;
    planName: string;
    planThumbnail?: string | null; // Uint8Arrayからstringに変更
    startDateTime: string; // Date型ではなく、ISO8601形式のstringを使用
    endDateTime: string; // 同上
    purpose: string | null;
    status: PlanStatus;
    startAreaId: string;
    endAreaId: string;
    conceptId: string;
};

export type ParentPlanDetail = {
    parentPlanId: string;
    userId: string;
    planName: string;
    planThumbnail: string | null;
    startDateTime: string;
    endDateTime: string;
    purpose: string | null;
    status: PlanStatus;
    startAreaId: string;
    endAreaId: string;
    conceptId: string;

    conceptName: string;
    startAreaName: string;
    endAreaName: string;
    startPrefectureName: string;
    endPrefectureName: string;
};

export type ChildPlanType = {
    childPlanId: string;
    parentPlanId: string;
    order: number;
    locationName: string;
    checkInTime: string | null;
    checkOutTime: string | null;
    memo: string | null;
};

export type PlanWithChildren = {
    parentPlanWithAreaAndPrefecture: ParentPlanDetail | null;
    childPlans: ChildPlanType[] | null;
};

// コンポーネント
export type DateTimePicker = {
    label?: string;
    startDateTime?: string | undefined | null;
    endDateTime?: string | undefined | null;
    onStartDateTimeChange: (value?: string) => void;
    onEndDateTimeChange: (value?: string) => void;
};

export type DateTimePickerGroups = {
    label?: string;
    dateTime?: string | undefined | null;
    onChange: (value?: string) => void;
};

export type Area = {
    areaId: string;
    areaName: string;
};

export type Prefecture = {
    prefectureId: string;
    prefectureName: string;
};
