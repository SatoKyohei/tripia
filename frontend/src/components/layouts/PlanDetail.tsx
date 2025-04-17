"use client";
import { Stack, TextField, Typography } from "@mui/material";
// import Image from "next/image";
import { useState } from "react";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import LocationSelectGroups from "@/components/elements/LocationSelect/LocationSelectGroups";
import ChildPlan from "@/components/layouts/ChildPlan";
import { ParentPlan, PlanWithChildren } from "@/types/type";
import { useParentPlan } from "@/hooks/useParentPlan";
import DetailPageButtonGroups from "@/components/elements/Button/DetailPageButtonGroups";

// 課題：DetailPageButtonGroups ⇨ EditButtonにpropsを受け渡している。冗長な気がする。
// 課題：ChildPlan.tsxに定義しているhandleChangeをDateTimePickerGroupsに指定。ただ、グローバルの状態管理した方がいいかも
const PlanDetail = ({ parentPlanWithAreaAndPrefecture, childPlans }: PlanWithChildren) => {
    const { startAreaName, endAreaName, startPrefectureName, endPrefectureName, ...rest } =
        parentPlanWithAreaAndPrefecture ?? {};

    const { plan, setPlan, handleChange, handleDelete, handleDuplicate } = useParentPlan(
        rest as ParentPlan,
    );


    if (!parentPlanWithAreaAndPrefecture) return null;

    return (
        <Stack spacing={3}>
            {/* 課題：ここにサムネ画像 */}
            {/* <Image src={parentPlan?.planThumbnail} alt="サムネイル"/> */}
            <TextField required defaultValue={parentPlanWithAreaAndPrefecture?.planName} />
            <DateTimePickerGroups
                startDateTime={plan?.startDateTime}
                endDateTime={plan?.endDateTime}
                onStartDateTimeChange={(value) =>
                    handleChange(
                        plan.parentPlanId,
                        "startDateTime",
                        value ?? "",
                    )
                }
                onEndDateTimeChange={(value) =>
                    handleChange(
                        plan.parentPlanId,
                        "endDateTime",
                        value ?? "",
                    )
                }
            />
            <LocationSelectGroups
                startPrefectureName={parentPlanWithAreaAndPrefecture?.startPrefectureName}
                startAreaName={parentPlanWithAreaAndPrefecture?.startAreaName}
                endPrefectureName={parentPlanWithAreaAndPrefecture?.endPrefectureName}
                endAreaName={parentPlanWithAreaAndPrefecture?.endAreaName}
            />
            {/* <PrimaryLocationSelect label={labels.concept} options={concepts} /> */}
            <TextField defaultValue={parentPlanWithAreaAndPrefecture?.purpose} />
            <TextField defaultValue={parentPlanWithAreaAndPrefecture?.status} />
            <Typography color="primary" component="h2" variant="h5">
                子プラン
            </Typography>
            <ChildPlan
                parentPlanId={parentPlanWithAreaAndPrefecture.parentPlanId}
                childPlans={childPlans}
            />
            <DetailPageButtonGroups
                planId={parentPlanWithAreaAndPrefecture.parentPlanId}
                handleDelete={() => handleDelete(parentPlanWithAreaAndPrefecture.parentPlanId)}
                handleDuplicate={() =>
                    handleDuplicate(parentPlanWithAreaAndPrefecture.parentPlanId)
                }
            />
        </Stack>
    );
};

export default PlanDetail;
