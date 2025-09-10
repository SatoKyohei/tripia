import { FormControl, MenuItem, Select } from "@mui/material";

type SortProps = {
    onChange: (value: string) => void;
    options: string[];
    defaultValue?: string;
};

const Sort = (props: SortProps) => {
    return (
        <FormControl>
            <Select
                defaultValue={props.defaultValue}
                onChange={(e) => props.onChange(e.target.value)}
            >
                {props.options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Sort;
