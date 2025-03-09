"use client";
import { Stack } from "@mui/material";
import CancelButton from "@/components/elements/Button/CancelButton";
import EditButton from "@/components/elements/Button/EditButton";
import DeleteButton from "@/components/elements/Button/DeleteButton";
import DuplicateButton from "@/components/elements/Button/DuplicateButton";

const DetailPageButtonGroups = ({ planId }: { planId: string }) => {
    // 課題：プラン削除のPostリクエスト
    const handleDelete = () => {};

    return (
        <Stack direction="row" spacing={2}>
            <EditButton planId={planId} />
            <DuplicateButton/>
            <DeleteButton onClick={handleDelete} />
            <CancelButton />
        </Stack>
    );
};

export default DetailPageButtonGroups;
