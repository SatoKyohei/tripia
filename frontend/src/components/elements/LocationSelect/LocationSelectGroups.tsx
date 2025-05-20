import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import BasicLocationSelect from "@/components/elements/LocationSelect/Basic/BasicLocationSelect";
import { ParentPlan } from "@/types/type";
import { areaList, prefectureList } from "@/data/locationMaster";

// 課題：ラベルはここに定義で本当に良いのか
const labels = {
    departure: "出発地（都道府県）",
    arrival: "到着地（都道府県）",
    departureArea: "出発地（エリア）",
    arrivalArea: "到着地（エリア）",
};

type LocationSelectGroupsProps = {
    startPrefectureId?: string;
    startAreaId?: string;
    endPrefectureId?: string;
    endAreaId?: string;
    parentPlanId?: string;
    handleChange?: (parentPlanId: string, key: keyof ParentPlan, value: string) => void;
    onLocalChange?: (key: "startAreaId" | "endAreaId", value: string) => void;
};

const LocationSelectGroups = (props: LocationSelectGroupsProps) => {
    const [startPrefectureId, setStartPrefectureId] = useState<string | null | undefined>(
        props.startPrefectureId,
    );
    const [endPrefectureId, setEndPrefectureId] = useState<string | null | undefined>(
        props.endPrefectureId,
    );

    const filterdStartAreaList = areaList.filter((area) => area.prefectureId === startPrefectureId);

    const filterdEndAreaList = areaList.filter((area) => area.prefectureId === endPrefectureId);

    useEffect(() => {
        const selectedStartArea = areaList.find((area) => area.areaId === props.startAreaId);
        if (selectedStartArea && selectedStartArea.prefectureId !== startPrefectureId) {
            setStartPrefectureId(selectedStartArea.prefectureId);
        }

        const selectedEndArea = areaList.find((area) => area.areaId === props.endAreaId);
        if (selectedEndArea && selectedEndArea.prefectureId !== endPrefectureId) {
            setEndPrefectureId(selectedEndArea.prefectureId);
        }
    }, [props.startPrefectureId, props.endPrefectureId]);

    return (
        <>
            <Stack direction="row" spacing={3}>
                <BasicLocationSelect
                    label={labels.departure}
                    location={startPrefectureId}
                    options={prefectureList}
                    onChange={(value) => {
                        setStartPrefectureId(value);
                    }}
                />
                <BasicLocationSelect
                    label={labels.departureArea}
                    location={props.startAreaId}
                    options={filterdStartAreaList}
                    onChange={(value) => {
                        if (props.handleChange && props.parentPlanId) {
                            props.handleChange(props.parentPlanId, "startAreaId", value);
                        } else if (props.onLocalChange) {
                            props.onLocalChange("startAreaId", value);
                        }
                    }}
                />
            </Stack>
            <Stack direction="row" spacing={3}>
                <BasicLocationSelect
                    label={labels.arrival}
                    location={endPrefectureId}
                    options={prefectureList}
                    onChange={(value) => {
                        setEndPrefectureId(value);
                    }}
                />
                <BasicLocationSelect
                    label={labels.arrivalArea}
                    location={props.endAreaId}
                    options={filterdEndAreaList}
                    onChange={(value) => {
                        if (props.handleChange && props.parentPlanId) {
                            props.handleChange(props.parentPlanId, "endAreaId", value);
                        } else if (props.onLocalChange) {
                            props.onLocalChange("endAreaId", value);
                        }
                    }}
                />
            </Stack>
        </>
    );
};

export default LocationSelectGroups;
