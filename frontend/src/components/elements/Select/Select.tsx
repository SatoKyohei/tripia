import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";

type SelectProps = {
    label: string;
    value: string;
    options: { id: string; name: string }[];
    onChange: (value: string) => void;
};

const Select = (props: SelectProps) => {
    return (
        <FormControl variant="filled" sx={{ minWidth: "160px", m: 1 }}>
            <InputLabel id="id">{props.label}</InputLabel>
            <MuiSelect
                value={props.value}
                onChange={(e) => {
                    const newValue = e.target.value as string;
                    props.onChange(newValue);
                }}
                labelId="id"
            >
                {props.options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};

export default Select;
