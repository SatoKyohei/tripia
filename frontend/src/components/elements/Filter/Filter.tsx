import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

type FilterProps = {
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    defaultValue?: string;
};

const Filter = (props: FilterProps) => {
    return (
        <FormControl>
            <FormLabel>フィルター</FormLabel>
            <RadioGroup
                row
                defaultValue={props.defaultValue}
                onChange={(e) => props.onChange(e.target.value)}
            >
                {props.options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default Filter;
