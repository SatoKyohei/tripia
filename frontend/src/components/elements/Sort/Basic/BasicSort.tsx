"use client";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

const BasicSort = () => {
    const [value, setValue] = useState("作成日順");

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    return (
        <FormControl>
            <Select value={value} onChange={handleChange}>
                <MenuItem value="作成日順">作成日順</MenuItem>
                <MenuItem value="更新日順">更新日順</MenuItem>
                <MenuItem value="開始日時順">開始日時順</MenuItem>
            </Select>
        </FormControl>
    );
};

export default BasicSort;
