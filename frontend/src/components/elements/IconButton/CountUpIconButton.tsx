import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BasicIconButton from "@/components/elements/IconButton/Basic/BasicIconButton";

// 課題：レイアウトを修正
// 課題：直接手入力がうまくいかないわけではないが使いづらい

type CountUpIconButtonProps = {
    handleCountUp: () => void;
};

const CountUpIconButton = (props: CountUpIconButtonProps) => {
    const { handleCountUp } = props;

    return (
        <>
            <BasicIconButton color="info" onClick={handleCountUp} size="medium">
                <AddCircleOutlineIcon />
            </BasicIconButton>
        </>
    );
};

export default CountUpIconButton;
