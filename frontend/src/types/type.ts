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

// export type ParentPlan = {
//     parentPlanId: string;
//     authorId: string;
//     conceptId: string;
//     planName: string;
//     planThumbnail: string | null;
//     startAreaId: string;
//     endAreaId: string;
//     startDateTime: string;
//     endDateTime: string;
//     purpose: string | null;
//     status: PlanStatus;
//     createdAt: string;
//     updatedAt: string;
// };

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
