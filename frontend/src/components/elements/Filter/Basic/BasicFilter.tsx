import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

type BasicFilterProps = {
    onChange: (value: string) => void;
};

const BasicFilter = ({ onChange }: BasicFilterProps) => {
    return (
        <FormControl>
            <FormLabel>フィルター</FormLabel>
            <RadioGroup row defaultValue="all" onChange={(e) => onChange(e.target.value)}>
                <FormControlLabel value="all" control={<Radio />} label="すべて" />
                <FormControlLabel value="Draft" control={<Radio />} label="下書き" />
                <FormControlLabel value="Published" control={<Radio />} label="公開済み" />
            </RadioGroup>
        </FormControl>
    );
};

export default BasicFilter;
