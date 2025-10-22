import { Stack } from "@mui/material";

import BasicDateTimePicker from "@/components/elements/DateTimePicker/DateTimePicker";

type DateTimePickerGroupsProps = {
    startDateTime?: string | null; // ISO（UTC）
    endDateTime?: string | null; // ISO（UTC）
    onStartDateTimeChange: (value: string | null) => void;
    onEndDateTimeChange: (value: string | null) => void;
};

const DateTimePickerGroups = (props: DateTimePickerGroupsProps) => {
    return (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <BasicDateTimePicker
                label="開始日時"
                dateTime={props.startDateTime}
                onChange={props.onStartDateTimeChange}
            />
            <BasicDateTimePicker
                label="終了日時"
                dateTime={props.endDateTime}
                onChange={props.onEndDateTimeChange}
            />
        </Stack>
    );
};

export default DateTimePickerGroups;
