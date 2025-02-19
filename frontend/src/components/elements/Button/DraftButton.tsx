import BasicButton from "@/components/elements/Button/Basic/BasicButton";

const DraftButton = () => {
    return (
        <BasicButton
            buttonName="下書き保存"
            component="button"
            href="/plans"
            variant="contained"
            sx={{ backgroundColor: "#2196F3" }}
        />
    );
};

export default DraftButton;
