import BasicButton from "@/components/elements/Button/Basic/BasicButton";

const DeleteButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <BasicButton
            buttonName="削除"
            component="button"
            onClick={onClick}
            variant="contained"
            sx={{ backgroundColor: "#F44336" }}
        />
    );
};

export default DeleteButton;
