"use client";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

// 課題：selectのwidth

type BasicLocationSelectProps = {
    label: string;
    option?: string;
};

const BasicLocationSelect = (props: BasicLocationSelectProps) => {
    const [location, setLocation] = useState("default");

    const handleChange = (event: SelectChangeEvent) => {
        setLocation(event.target.value as string);
    };

    return (
        <FormControl variant="filled">
            <InputLabel id="location">{props.label}</InputLabel>
            <Select
                value={location}
                onChange={handleChange}
                labelId="location"
                sx={{ width: "200px" }}
            >
                <MenuItem value="default">{props.option}</MenuItem>
            </Select>
        </FormControl>
    );
};

export default BasicLocationSelect;
