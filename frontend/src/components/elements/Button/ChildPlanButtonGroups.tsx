import { Stack } from "@mui/material";
import DeleteButton from "@/components/elements/Button/DeleteButton";
import DuplicateButton from "@/components/elements/Button/DuplicateButton";

const ChildPlanButtonGroups = ({ onClick }: { onClick: () => void }) => {

    return (
        <Stack direction="row" spacing={2}>
            <DuplicateButton />
            <DeleteButton onClick={onClick} />
        </Stack>
    );
};

export default ChildPlanButtonGroups;
