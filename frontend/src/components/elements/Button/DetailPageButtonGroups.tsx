"use client";
import { Stack } from "@mui/material";
import CancelButton from "@/components/elements/Button/CancelButton";
import DeleteButton from "@/components/elements/Button/DeleteButton";
import DuplicateButton from "@/components/elements/Button/DuplicateButton";

const DetailPageButtonGroups = ({
    handleDelete,
    handleDuplicate,
}: {
    handleDelete: () => void;
    handleDuplicate: () => void;
}) => {
    return (
        <Stack direction="row" spacing={2}>
            <DuplicateButton onClick={handleDuplicate}/>
            <DeleteButton onClick={handleDelete} />
            <CancelButton />
        </Stack>
    );
};

export default DetailPageButtonGroups;
