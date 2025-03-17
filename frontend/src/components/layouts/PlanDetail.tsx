"use client";
import { Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import LocationSelectGroups from "@/components/elements/LocationSelect/LocationSelectGroups";
import ChildPlan from "@/components/layouts/ChildPlan";
import { PlanWithChildren } from "@/types/type";

// 課題：DetailPageButtonGroups ⇨ EditButtonにpropsを受け渡している。冗長な気がする。
const PlanDetail = ({ parentPlan, childPlans }: PlanWithChildren) => {
    return (
        <Stack spacing={3}>
            {/* 課題：ここにサムネ画像 */}
            {/* <Image src={parentPlan?.planThumbnail} alt="サムネイル"/> */}
            <TextField required defaultValue={parentPlan?.planName} />
            <DateTimePickerGroups
                startDateTime={parentPlan?.startDateTime}
                endDateTime={parentPlan?.endDateTime}
            />
            <LocationSelectGroups
                startPrefectureName={parentPlan?.startPrefectureName}
                startAreaName={parentPlan?.startAreaName}
                endPrefectureName={parentPlan?.endPrefectureName}
                endAreaName={parentPlan?.endAreaName}
            />
            {/* <PrimaryLocationSelect label={labels.concept} options={concepts} /> */}
            <TextField defaultValue={parentPlan?.purpose} />
            <TextField defaultValue={parentPlan?.status} />
            <Typography color="primary" component="h2" variant="h5">
                子プラン
            </Typography>
            <ChildPlan childPlans={childPlans}/>
        </Stack>
    );
};

export default PlanDetail;
