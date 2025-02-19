import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BasicIconButton from "@/components/elements/IconButton/Basic/BasicIconButton";

// 課題：レイアウトを修正
// 課題：直接手入力がうまくいかないわけではないが使いづらい

type CountDownIconButtonProps = {
    handleCountDown: () => void;
};

const CountDownIconButton = (props: CountDownIconButtonProps) => {
    const { handleCountDown } = props;

    return (
        <>
            <BasicIconButton onClick={handleCountDown}>
                <RemoveCircleIcon />
            </BasicIconButton>
        </>
    );
};

export default CountDownIconButton;
