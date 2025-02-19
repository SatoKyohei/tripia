"use client";
import { Stack } from "@mui/material";
import CancelButton from "@/components/elements/Button/CancelButton";
import UpdateButton from "@/components/elements/Button/UpdateButton";

const EditPageButtonGroups = ({ planId }: { planId: number }) => {
    // 課題：プラン更新のPostリクエスト

    return (
        <Stack direction="row" spacing={2}>
            <UpdateButton planId={planId} />
            <CancelButton />
        </Stack>
    );
};

export default EditPageButtonGroups;
