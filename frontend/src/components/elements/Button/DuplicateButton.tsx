import BasicButton from "@/components/elements/Button/Basic/BasicButton";

const DuplicateButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <BasicButton
            buttonName="複製"
            component="button"
            variant="contained"
            onClick={onClick}
            sx={{ backgroundColor: "#2196F3" }}
        />
    );
};

export default DuplicateButton;
