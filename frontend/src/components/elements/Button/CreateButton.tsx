import BasicButton from "@/components/elements/Button/Basic/BasicButton";

const CreateButton = () => {
    return (
        <BasicButton
            buttonName="作成"
            component="button"
            href="/plans"
            variant="contained"
            sx={{ backgroundColor: "#4CAF50" }}
        />
    );
};

export default CreateButton;
