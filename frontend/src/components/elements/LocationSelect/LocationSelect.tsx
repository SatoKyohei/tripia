"use client";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SxProps } from "@mui/system";

import { Area, Prefecture } from "@/types/type";

type LocationSelectProps = {
    id: string;
    label: string;
    value: string | undefined;
    options: Area[] | Prefecture[];
    onChange: (value: string) => void;
    sx?: SxProps; // Add sx prop for custom styling
};

const LocationSelect = ({ id, label, value, options, onChange, sx }: LocationSelectProps) => {
    return (
        <FormControl variant="filled" sx={{ minWidth: 200, ...sx }}>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
                labelId={`${id}-label`}
                id={id}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
            >
                <MenuItem value="">{label}を選択してください</MenuItem>
                {options.map((option) => {
                    const locationName =
                        "prefectureName" in option ? option.prefectureName : option.areaName;
                    const value = "areaId" in option ? option.areaId : option.prefectureId;

                    return (
                        <MenuItem key={value} value={value}>
                            {locationName}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default LocationSelect;
