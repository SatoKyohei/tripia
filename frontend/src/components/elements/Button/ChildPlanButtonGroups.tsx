import { Stack } from "@mui/material";
import DeleteButton from "@/components/elements/Button/DeleteButton";
import DuplicateButton from "@/components/elements/Button/DuplicateButton";

type ChildPlanButtonGroupsProps = {
    onDelete: () => void;
    onDuplicate: () => void;
};

const ChildPlanButtonGroups = ({ onDelete, onDuplicate }: ChildPlanButtonGroupsProps) => {
    return (
        <Stack direction="row" spacing={2}>
            <DuplicateButton onClick={onDuplicate} />
            <DeleteButton onClick={onDelete} />
        </Stack>
    );
};

export default ChildPlanButtonGroups;
