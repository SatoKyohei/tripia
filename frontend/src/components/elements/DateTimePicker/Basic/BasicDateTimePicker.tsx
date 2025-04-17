import { MobileDateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { DateTimePickerGroups } from "@/types/type";

const BasicDateTimePicker = (props: DateTimePickerGroups) => {
    return (
        <MobileDateTimePicker
            label={props.label}
            value={props.dateTime ? moment(props.dateTime).local() : null}
            format="YYYY/MM/DD HH:mm"
            onChange={(dateTime) => {
                props.onChange(dateTime?.toDate().toISOString());
            }}
        />
    );
};

export default BasicDateTimePicker;
