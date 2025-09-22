import { Card, CardContent, CardHeader, Divider, Grid2 } from "@mui/material";
import { ParentPlan } from "@/types/type";
import LocationSelectGroups from "@/components/elements/LocationSelect/LocationSelectGroups";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";

type PlanLocationAndDatetimeSectionProps = {
    plan: ParentPlan;
    handleChange: (parentPlanId: string, key: keyof ParentPlan, value: string) => void;
    startPrefectureId: string | undefined;
    endPrefectureId: string | undefined;
    setStartPrefectureId: (id: string | undefined) => void;
    setEndPrefectureId: (id: string | undefined) => void;
    prefectureList: { prefectureId: string; prefectureName: string }[];
    filterdStartAreaList: { areaId: string; areaName: string; prefectureId: string }[];
    filterdEndAreaList: { areaId: string; areaName: string; prefectureId: string }[];
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
                </CardContent>
            </Card>
        </Grid2>
    );
};

export default PlanLocationAndDatetimeSection;
