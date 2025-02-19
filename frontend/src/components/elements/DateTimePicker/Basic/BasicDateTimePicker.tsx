import { MobileDateTimePicker } from "@mui/x-date-pickers";

const BasicDateTimePicker = ({ label }: { label: string }) => {
    return <MobileDateTimePicker label={label} format="YYYY/MM/DD HH:mm" />;
};

export default BasicDateTimePicker;
