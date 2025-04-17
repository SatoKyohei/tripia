// テーブル
type PlanStatus = "Draft" | "Published" | "Completed";

export type ParentPlan = {
    parentPlanId: string;
    authorId: string;
    conceptName: string;
    planName: string;
    planThumbnail: string | null;
    startAreaId: string;
    endAreaId: string;
    startDateTime: string;
    endDateTime: string;
    purpose: string | null;
    status: PlanStatus;
};

export type ParentPlanParams = {
    parentPlanId: string;
    authorId: string;
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
    authorId: string;
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
    parentPlanWithAreaAndPrefecture: ParentPlanDetail | null;
    childPlans: ChildPlan[] | null;
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
