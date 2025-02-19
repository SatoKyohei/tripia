import { Box } from "@mui/material";
import CountUpIconButton from "@/components/elements/IconButton/CountUpIconButton";
import CountDownIconButton from "@/components/elements/IconButton/CountDownIconButton";

// 課題：レイアウトを修正
// 課題：直接手入力がうまくいかないわけではないが使いづらい

type CountIconButtonGroupsProps = {
    handleCountUp: () => void;
    handleCountDown: () => void;
};

const CountIconButtonGroups = (props: CountIconButtonGroupsProps) => {
    const { handleCountUp, handleCountDown } = props;

    return (
        <Box>
            <CountUpIconButton handleCountUp={handleCountUp}/>
            <CountDownIconButton handleCountDown={handleCountDown}/>
        </Box>
    );
};

export default CountIconButtonGroups;
