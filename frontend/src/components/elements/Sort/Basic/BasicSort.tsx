"use client";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

type BasicSortProps = {
    onChange: (value: string) => void;
};

const BasicSort = ({ onChange }: BasicSortProps) => {
    return (
        <FormControl>
            <Select defaultValue="新しい順" onChange={(e) => onChange(e.target.value)}>
                <MenuItem value="新しい順">新しい順</MenuItem>
                <MenuItem value="古い順">古い順</MenuItem>
            </Select>
        </FormControl>
    );
};

export default BasicSort;
