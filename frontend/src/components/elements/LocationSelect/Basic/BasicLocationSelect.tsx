"use client";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

// 課題：selectのwidth

type BasicLocationSelectProps = {
    label: string;
    options: { id: number; name: string }[];
};

const BasicLocationSelect = (props: BasicLocationSelectProps) => {
    const { label, options } = props;
    const [location, setLocation] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setLocation(event.target.value);
    };

    return (
        <FormControl variant="filled">
            <InputLabel id="location">{label}</InputLabel>
            <Select value={location} onChange={handleChange} labelId="location" sx={{width: "200px"}}>
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default BasicLocationSelect;
