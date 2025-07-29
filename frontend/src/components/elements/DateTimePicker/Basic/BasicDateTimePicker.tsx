import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DateTimePickerGroups } from "@/types/type";

dayjs.extend(utc);

const BasicDateTimePicker = (props: DateTimePickerGroups) => {
    const localValue =
        typeof window !== "undefined" && props.dateTime ? dayjs.utc(props.dateTime).local() : null;

    return (
        <MobileDateTimePicker
            label={props.label}
            value={localValue}
            format="YYYY/MM/DD HH:mm"
            onAccept={(dateTime) => {
                props.onChange(dateTime?.toDate().toISOString());
            }}
        />
    );
};

export default BasicDateTimePicker;
