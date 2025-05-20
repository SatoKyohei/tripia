"use client";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { Area, ParentPlan, Prefecture } from "@/types/type";

// 課題：selectのwidth
// 課題：Prefectureに対して、そのPrefecture内に実在するエリアだけプルダウンに表示されるようにする。たとえば東京を選択していて、小田原エリアを選択できると変

type BasicLocationSelectProps = {
    label: string;
    location: string | null | undefined;
    options: Area[] | Prefecture[];
    onChange: (value: string) => void;
};

const BasicLocationSelect = (props: BasicLocationSelectProps) => {
    const [place, setPlace] = useState(props.location ?? "default");

    useEffect(() => {
        setPlace(props.location ?? "default");
    }, [props.location]);

    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value as string;
        setPlace(newValue);
        props.onChange(newValue);
    };

    return (
        <FormControl variant="filled">
            <InputLabel id="location">{props.label}</InputLabel>
            <Select
                value={place}
                onChange={handleChange}
                labelId="location"
                sx={{ width: "200px" }}
            >
                {place === "default" && (
                    <MenuItem key="default" value="default">
                        {props.label}を選択してください
                    </MenuItem>
                )}

                {props.options.map((option) => {
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

export default BasicLocationSelect;
