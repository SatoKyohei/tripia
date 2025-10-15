import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControlLabel,
    Grid2,
    Stack,
    Switch,
    TextField,
} from "@mui/material";

import { ParentPlanType } from "@/types/type";
import LocationSelectGroups from "@/components/elements/LocationSelect/LocationSelectGroups";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import CountUpIconButton from "@/components/elements/IconButton/CountUpIconButton";
import CountDownIconButton from "@/components/elements/IconButton/CountDownIconButton";

type PlanLocationAndDatetimeSectionProps = {
    plan: ParentPlanType;
    handleChange: (parentPlanId: string, key: keyof ParentPlanType, value: string) => void;
    startPrefectureId: string | undefined;
    endPrefectureId: string | undefined;
    setStartPrefectureId: (id: string | undefined) => void;
    setEndPrefectureId: (id: string | undefined) => void;
    prefectureList: { prefectureId: string; prefectureName: string }[];
    filterdStartAreaList: { areaId: string; areaName: string; prefectureId: string }[];
    filterdEndAreaList: { areaId: string; areaName: string; prefectureId: string }[];
    isAutoCreatePlan?: boolean;
    childPlanCount?: number;
    incrementChildPlanCount?: () => void;
    decrementChildPlanCount?: () => void;
    handleAutoCreateToggle?: (checked: boolean) => void;
};

const PlanLocationAndDatetimeSection = ({
    plan,
    handleChange,
    startPrefectureId,
    endPrefectureId,
    setStartPrefectureId,
    setEndPrefectureId,
    prefectureList,
    filterdStartAreaList,
    filterdEndAreaList,
    isAutoCreatePlan,
    childPlanCount,
    incrementChildPlanCount,
    decrementChildPlanCount,
    handleAutoCreateToggle,
}: PlanLocationAndDatetimeSectionProps) => {
    return (
        <Grid2 size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: "100%" }}>
                <CardHeader title="場所と時間" />
                <CardContent>
                    <LocationSelectGroups
                        startPrefectureId={startPrefectureId}
                        startAreaId={plan.startAreaId}
                        endPrefectureId={endPrefectureId}
                        endAreaId={plan.endAreaId}
                        prefectureOptions={prefectureList}
                        startAreaOptions={filterdStartAreaList}
                        endAreaOptions={filterdEndAreaList}
                        onChange={(key, value) => {
                            if (key === "startAreaId" || key === "endAreaId") {
                                handleChange(plan.parentPlanId, key, value);
                            } else if (key === "startPrefectureId") {
                                setStartPrefectureId(value);
                            } else if (key === "endPrefectureId") {
                                setEndPrefectureId(value);
                            }
                        }}
                    />
                    <Divider sx={{ my: 3 }} />
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

                    {/* 自動生成の切り替え */}
                    {isAutoCreatePlan !== undefined && handleAutoCreateToggle && (
                        <>
                            <Divider sx={{ my: 3 }} />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isAutoCreatePlan}
                                        onChange={(e) => handleAutoCreateToggle(e.target.checked)}
                                    />
                                }
                                label="プランを自動生成する"
                            />
                            {isAutoCreatePlan &&
                                childPlanCount !== undefined &&
                                incrementChildPlanCount &&
                                decrementChildPlanCount && (
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        sx={{ mt: 2 }}
                                        alignItems="center"
                                    >
                                        <TextField
                                            label="目的地の数"
                                            value={childPlanCount}
                                            inputProps={{ readOnly: true }}
                                            sx={{ width: 120 }}
                                        />
                                        <CountUpIconButton handleCountUp={incrementChildPlanCount} />
                                        <CountDownIconButton handleCountDown={decrementChildPlanCount} />
                                    </Stack>
                                )}
                        </>
                    )}
                </CardContent>
            </Card>
        </Grid2>
    );
};

export default PlanLocationAndDatetimeSection;
