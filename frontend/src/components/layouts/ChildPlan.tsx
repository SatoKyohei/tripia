"use client";
import { Box, Stack, TextField } from "@mui/material";
import { useState } from "react";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import CountUpIconButton from "@/components/elements/IconButton/CountUpIconButton";
import ChildPlanButtonGroups from "@/components/elements/Button/ChildPlanButtonGroups";

const ChildPlan = () => {
    // 課題：このusestateとhandleCountUp, handleCountDownは/plans/create/page.tsxでも定義しているのでリファクタリング。でもこっちのhandleCountDownは0個も可能だからそこをどうするか。
    // 課題：削除ボタンを押すと、その削除ボタンの上の子プランではなく、一番下の子プランが消えてしまう

    const [count, setCount] = useState(0);

    const handleCountUp = () => {
        setCount((prev) => (prev < 50 ? prev + 1 : 50));
    };

    const handleCountDown = () => {
        setCount((prev) => (prev > 0 ? prev - 1 : 1));
    };

    return (
        <Box>
            {Array.from({ length: count }).map((_, index) => (
                <Stack key={index} spacing={2} sx={{ mb: 3 }}>
                    <TextField label="目的地" />
                    <DateTimePickerGroups />
                    <TextField label="メモ" />
                    <ChildPlanButtonGroups onClick={handleCountDown}/>
                </Stack>
            ))}

            <CountUpIconButton handleCountUp={handleCountUp} />
        </Box>
    );
};

export default ChildPlan;
