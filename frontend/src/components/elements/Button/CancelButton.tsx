import BasicButton from "@/components/elements/Button/Basic/BasicButton";

const CancelButton = () => {
    return (
        <BasicButton
            buttonName="キャンセル"
            component="button"
            href="/plans"
            variant="contained"
            sx={{ backgroundColor: "#9E9E9E" }}
        />
    );
};

export default CancelButton;
