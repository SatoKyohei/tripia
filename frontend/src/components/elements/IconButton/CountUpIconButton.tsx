import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@/components/elements/IconButton/IconButton";

const CountUpIconButton = (props: { handleCountUp: () => void }) => {
    return (
        <IconButton color="info" onClick={props.handleCountUp} size="medium">
            <AddCircleOutlineIcon />
        </IconButton>
    );
};

export default CountUpIconButton;
