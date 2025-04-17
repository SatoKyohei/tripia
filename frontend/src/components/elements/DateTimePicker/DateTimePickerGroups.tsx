import { Stack } from "@mui/material";
import BasicDateTimePicker from "@/components/elements/DateTimePicker/Basic/BasicDateTimePicker";
import { DateTimePicker } from "@/types/type";

const DateTimePickerGroups = (props: DateTimePicker) => {
    return (
        <Stack direction="row" spacing={3}>
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
