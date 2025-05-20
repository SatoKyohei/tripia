import BasicButton from "@/components/elements/Button/Basic/BasicButton";

const DraftButton = ({ handleClick }: { handleClick: () => void }) => {
    return (
        <BasicButton
            buttonName="下書き保存"
            component="button"
            href="/plans"
            variant="contained"
            sx={{ backgroundColor: "#2196F3" }}
            onClick={handleClick}
        />
    );
};

export default DraftButton;
