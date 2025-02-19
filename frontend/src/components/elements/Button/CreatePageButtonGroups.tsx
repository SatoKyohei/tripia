import { Stack } from "@mui/material";
import CancelButton from "@/components/elements/Button/CancelButton";
import CreateButton from "@/components/elements/Button/CreateButton";
import DraftButton from "@/components/elements/Button/DraftButton";

const CreatePageButtonGroups = () => {
    return (
        <Stack direction="row" spacing={2}>
            <CreateButton />
            <DraftButton />
            <CancelButton />
        </Stack>
    );
};

export default CreatePageButtonGroups;
