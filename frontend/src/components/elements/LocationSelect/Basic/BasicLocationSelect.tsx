"use client";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

// 課題：selectのwidth

type BasicLocationSelectProps = {
    label: string;
    location?: string;
    options: string[];
};

const BasicLocationSelect = (props: BasicLocationSelectProps) => {
    const [place, setPlace] = useState("default");

    const handleChange = (event: SelectChangeEvent) => {
        setPlace(event.target.value as string);
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
                {/* 課題：リロードするとここでエラー起きる。https://qiita.com/course_k/items/86686e7ccdac40c8d51b */}
                {props.options.map((option) =>
                    props.location === option ? (
                        <MenuItem key={props.location} value="default">
                            {props.location}
                        </MenuItem>
                    ) : (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ),
                )}
            </Select>
        </FormControl>
    );
};

export default BasicLocationSelect;
