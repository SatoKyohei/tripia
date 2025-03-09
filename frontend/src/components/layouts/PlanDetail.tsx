"use client";
import { Stack, TextField, Typography } from "@mui/material";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import LocationSelectGroups from "@/components/elements/LocationSelect/LocationSelectGroups";
import ChildPlan from "@/components/layouts/ChildPlan";
import { ParentPlan } from "@/types/type";

// 課題：DetailPageButtonGroups ⇨ EditButtonにpropsを受け渡している。冗長な気がする。
const PlanDetail = ({ plan }: { plan: ParentPlan | null }) => {
    return (
        <Stack spacing={3}>
            {/* ここにサムネ画像 */}
            <TextField required defaultValue={plan?.planName} />
            <DateTimePickerGroups
                startDateTime={plan?.startDateTime}
                endDateTime={plan?.endDateTime}
            />
            {/* PlanDetail.tsxでareaIdの値をfetchしておく */}
            <LocationSelectGroups
                startPrefectureName={plan?.startPrefectureName}
                startAreaName={plan?.startAreaName}
                endPrefectureName={plan?.endPrefectureName}
                endAreaName={plan?.endAreaName}
            />
            {/* <PrimaryLocationSelect label={labels.concept} options={concepts} /> */}
            <TextField defaultValue={plan?.purpose} />
            <Typography color="primary" component="h2" variant="h5">
                子プラン
            </Typography>
            <ChildPlan />
        </Stack>
    );
};

export default PlanDetail;
