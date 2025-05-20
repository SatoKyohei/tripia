"use client";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { PlanStatus } from "@/types/type";

type BasicStatusSelectProps = {
    status: string | null | undefined;
    onChange: (value: string) => void;
};
const options: PlanStatus[] = ["Draft", "Published"];

const BasicStatusSelect = (props: BasicStatusSelectProps) => {
    const [planStatus, setPlanStatus] = useState(props.status ?? "default");

    useEffect(() => {
        setPlanStatus(props.status ?? "default");
    }, [props.status]);

    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value as string;
        setPlanStatus(newValue);
        props.onChange(newValue);
    };

    return (
        <FormControl variant="filled">
            <InputLabel id="status">ステータス</InputLabel>
            <Select
                value={planStatus}
                onChange={handleChange}
                labelId="status"
                sx={{ width: "200px" }}
            >
                {planStatus === "default" && (
                    <MenuItem key="default" value="default">
                        ステータスを選択してください
                    </MenuItem>
                )}

                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default BasicStatusSelect;
