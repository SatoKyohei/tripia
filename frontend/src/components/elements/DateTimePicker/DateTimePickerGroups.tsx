import { Stack } from "@mui/material";
import PrimaryDateTimePicker from "@/components/elements/DateTimePicker/Basic/BasicDateTimePicker";

const DateTimePickerGroups = () => {
    return (
        <Stack direction="row" spacing={3}>
            <PrimaryDateTimePicker label="開始日時" />
            <PrimaryDateTimePicker label="終了日時" />
        </Stack>
    );
};

export default DateTimePickerGroups;
