import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const BasicFilter = () => {
    return (
        <FormControl>
            <FormLabel>フィルター</FormLabel>
            <RadioGroup row defaultValue="all">
                <FormControlLabel value="all" control={<Radio />} label="すべて" />
                <FormControlLabel value="draft" control={<Radio />} label="下書き" />
                <FormControlLabel value="published" control={<Radio />} label="公開済み" />
                <FormControlLabel value="complete" control={<Radio />} label="完了" />
            </RadioGroup>
        </FormControl>
    );
};

export default BasicFilter;
