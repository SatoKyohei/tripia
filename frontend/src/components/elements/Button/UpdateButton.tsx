import BasicButton from "@/components/elements/Button/Basic/BasicButton";

// 課題：実装次第ではプランIDはnumberじゃないかも
const UpdateButton = ({ planId }: { planId: number }) => {
    return (
        <BasicButton
            buttonName="更新"
            component="button"
            href={`/plans/${planId}`}
            variant="contained"
            sx={{ backgroundColor: "#4CAF50" }}
        />
    );
};

export default UpdateButton;
