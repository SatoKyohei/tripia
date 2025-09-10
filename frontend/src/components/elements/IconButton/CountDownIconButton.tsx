import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@/components/elements/IconButton/IconButton";

const CountDownIconButton = (props: { handleCountDown: () => void }) => {
    return (
        <IconButton color="default" onClick={props.handleCountDown} size="medium">
            <RemoveCircleIcon />
        </IconButton>
    );
};

export default CountDownIconButton;
