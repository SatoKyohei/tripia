import BasicButton from "@/components/elements/Button/Basic/BasicButton";

const CreateButton = ({ handleClick }: { handleClick: () => void }) => {
    return (
        <BasicButton
            buttonName="公開"
            component="button"
            // href="/plans"
            variant="contained"
            sx={{ backgroundColor: "#4CAF50" }}
            onClick={handleClick}
        />
    );
};

export default CreateButton;
