import BasicButton from "@/components/elements/Button/Basic/BasicButton";

// 課題：実装次第ではプランIDはnumberじゃないかも
const EditButton = ({ planId }: { planId: number }) => {
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
