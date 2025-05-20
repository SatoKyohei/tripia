"use client";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { conceptList } from "@/data/conceptMaster";

type BasicConceptSelectProps = {
    conceptId?: string | null | undefined;
    onChange: (value: string) => void;
};
const options = conceptList;

const BasicConceptSelect = (props: BasicConceptSelectProps) => {
    const [planConcept, setPlanConcept] = useState(props.conceptId ?? "default");

    useEffect(() => {
        setPlanConcept(props.conceptId ?? "default");
    }, [props.conceptId]);

    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value as string;
        setPlanConcept(newValue);
        props.onChange(newValue);
    };

    return (
        <FormControl variant="filled">
            <InputLabel id="concept">旅行のコンセプト</InputLabel>
            <Select
                value={planConcept}
                onChange={handleChange}
                labelId="concept"
                sx={{ width: "200px" }}
            >
                {planConcept === "default" && (
                    <MenuItem key="default" value="default">
                        選択してください
                    </MenuItem>
                )}

                {options.map((option) => (
                    <MenuItem key={option.conceptId} value={option.conceptId}>
                        {option.conceptName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default BasicConceptSelect;
