import { Stack } from "@mui/material";

import LocationSelect from "@/components/elements/LocationSelect/LocationSelect";
import { Area, Prefecture } from "@/types/type";

type LocationSelectGroupsProps = {
    startPrefectureId?: string;
    startAreaId?: string;
    endPrefectureId?: string;
    endAreaId?: string;
    prefectureOptions: Prefecture[];
    startAreaOptions: Area[];
    endAreaOptions: Area[];
    onChange: (
        key: "startPrefectureId" | "startAreaId" | "endPrefectureId" | "endAreaId",
        value: string,
    ) => void;
};

const LocationSelectGroups = ({
    startPrefectureId,
    startAreaId,
    endPrefectureId,
    endAreaId,
    prefectureOptions,
    startAreaOptions,
    endAreaOptions,
    onChange,
}: LocationSelectGroupsProps) => {
    return (
        <>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <LocationSelect
                    id="start-pref"
                    label="出発地（都道府県）"
                    value={startPrefectureId}
                    options={prefectureOptions}
                    onChange={(value) => onChange("startPrefectureId", value)}
                    sx={{ flex: 1, minWidth: "calc(50% - 12px)" }}
                />
                <LocationSelect
                    id="start-area"
                    label="出発地（エリア）"
                    value={startAreaId}
                    options={startAreaOptions}
                    onChange={(value) => onChange("startAreaId", value)}
                    sx={{ flex: 1, minWidth: "calc(50% - 12px)" }}
                />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mt: 4 }}>
                <LocationSelect
                    id="end-pref"
                    label="到着地（都道府県）"
                    value={endPrefectureId}
                    options={prefectureOptions}
                    onChange={(value) => onChange("endPrefectureId", value)}
                    sx={{ flex: 1, minWidth: "calc(50% - 12px)" }}
                />
                <LocationSelect
                    id="end-area"
                    label="到着地（エリア）"
                    value={endAreaId}
                    options={endAreaOptions}
                    onChange={(value) => onChange("endAreaId", value)}
                    sx={{ flex: 1, minWidth: "calc(50% - 12px)" }}
                />
            </Stack>
        </>
    );
};

export default LocationSelectGroups;
