"use client";
import { Stack, TextField, Typography } from "@mui/material";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import LocationSelectGroups from "@/components/elements/LocationSelect/LocationSelectGroups";
import ChildPlan from "@/components/layouts/ChildPlan";


const PlanDetail = () => {
    // 課題：ダミーの指定
    // 課題：DetailPageButtonGroups ⇨ EditButtonにpropsを受け渡している。冗長な気がする。

    return (
        <Stack spacing={3}>
            {/* ここにサムネ画像 */}
            <TextField required label="プラン名" />
            <DateTimePickerGroups />
            <LocationSelectGroups />
            {/* <PrimaryLocationSelect label={labels.concept} options={concepts} /> */}
            <TextField label="目的" />
            <Typography color="primary" component="h2" variant="h5">
                子プラン
            </Typography>
            <ChildPlan />
        </Stack>
    );
};

export default PlanDetail;
