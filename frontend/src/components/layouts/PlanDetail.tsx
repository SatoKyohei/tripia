"use client";
import { Stack, TextField, Typography } from "@mui/material";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import LocationSelectGroups from "@/components/elements/LocationSelect/LocationSelectGroups";
import ChildPlan from "@/components/layouts/ChildPlan";
import { ParentPlan, ChildPlanType } from "@/types/type";
import DetailPageButtonGroups from "@/components/elements/Button/DetailPageButtonGroups";
import { getPrefectureIdByAreaId } from "@/data/locationMaster";
import { useParentPlanEdit } from "@/hooks/useParentPlanEdit";
import BasicStatusSelect from "@/components/elements/StatusSelect/Basic/BasicStatusSelect";

// 課題：DetailPageButtonGroups ⇨ EditButtonにpropsを受け渡している。冗長な気がする。
// 課題：ChildPlan.tsxに定義しているhandleChangeをDateTimePickerGroupsに指定。ただ、グローバルの状態管理した方がいいかも
const PlanDetail = ({
    parentPlan,
    childPlans,
}: {
    parentPlan: ParentPlan;
    childPlans: ChildPlanType[];
}) => {
    const { plan, setPlan, handleChange, handleDelete, handleDuplicate } = useParentPlanEdit(
        parentPlan as ParentPlan,
    );



    const startPrefectureId = getPrefectureIdByAreaId(plan.startAreaId);
    const endPrefectureId = getPrefectureIdByAreaId(plan.endAreaId);

    return (
        <Stack spacing={3}>
            {/* 課題：ここにサムネ画像 */}
            {/* <Image src={parentPlan?.planThumbnail} alt="サムネイル"/> */}
            <TextField
                required
                defaultValue={plan?.planName}
                onBlur={(e) => handleChange(plan.parentPlanId, "planName", e.target.value)}
            />
            <DateTimePickerGroups
                startDateTime={plan?.startDateTime ?? ""}
                endDateTime={plan?.endDateTime ?? ""}
                onStartDateTimeChange={(value) =>
                    handleChange(plan.parentPlanId, "startDateTime", value ?? "")
                }
                onEndDateTimeChange={(value) =>
                    handleChange(plan.parentPlanId, "endDateTime", value ?? "")
                }
            />
            <LocationSelectGroups
                startPrefectureId={startPrefectureId}
                startAreaId={plan.startAreaId}
                endPrefectureId={endPrefectureId}
                endAreaId={plan.endAreaId}
                parentPlanId={plan.parentPlanId}
                handleChange={handleChange}
            />
            {/* <PrimaryLocationSelect label={labels.concept} options={concepts} /> */}
            <TextField
                defaultValue={plan?.purpose}
                onBlur={(e) => handleChange(plan.parentPlanId, "purpose", e.target.value)}
            />
            <BasicStatusSelect
                status={plan.status}
                onChange={(value) => handleChange(plan.status, "status", value)}
            />
            <Typography color="primary" component="h2" variant="h5">
                子プラン
            </Typography>
            <ChildPlan parentPlanId={parentPlan.parentPlanId} childPlans={childPlans} />
            <DetailPageButtonGroups
                planId={parentPlan.parentPlanId}
                handleDelete={() => handleDelete(parentPlan.parentPlanId)}
                handleDuplicate={() => handleDuplicate(parentPlan.parentPlanId)}
            />
        </Stack>
    );
};

export default PlanDetail;
