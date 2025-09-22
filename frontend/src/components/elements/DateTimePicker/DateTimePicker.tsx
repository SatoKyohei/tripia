import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

type BasicDateTimePickerProps = {
    label: string;
    dateTime?: string | null; // ISO文字列（UTC）
    onChange: (value: string | null) => void; // ISO文字列（UTC）を返す
};

const BasicDateTimePicker = (props: BasicDateTimePickerProps) => {
    // 文字列（UTC ISO）を local の dayjs に変換
    const toLocal = (dt?: string | null): Dayjs | null => (dt ? dayjs.utc(dt).local() : null);

    // local の dayjs を UTC ISO 文字列に変換
    const toUtcIso = (dt?: Dayjs | null): string | null =>
        dt ? dt.utc().toDate().toISOString() : null;

    return (
        <MobileDateTimePicker
            label={props.label}
            value={toLocal(props.dateTime)}
            format="YYYY/MM/DD HH:mm"
            onAccept={(selected) => props.onChange(toUtcIso(selected))}
        />
    );
};

export default BasicDateTimePicker;
