import BasicButton from "@/components/elements/Button/Basic/BasicButton";


const EditButton = ({ planId }: { planId: string }) => {
    return (
        <BasicButton
            buttonName="編集"
            component="button"
            href={`/plans/${planId}/edit`}
            variant="contained"
            sx={{ backgroundColor: "#4CAF50" }}
        />
    );
};

export default EditButton;
