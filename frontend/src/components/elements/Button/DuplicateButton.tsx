import BasicButton from "@/components/elements/Button/Basic/BasicButton";

const DuplicateButton = () => {
    return (
        <BasicButton
            buttonName="複製"
            component="button"
            href="/plans"
            variant="contained"
            sx={{ backgroundColor: "#2196F3" }}
        />
    );
};

export default DuplicateButton;
