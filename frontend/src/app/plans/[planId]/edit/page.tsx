import { Container } from "@mui/material";
import EditPageButtonGroups from "@/components/elements/Button/EditPageButtonGroups";
import PlanDetail from "@/components/layouts/PlanDetail";

const EditPlanPage = () => {
    // 課題：ダミーの指定
    // 課題：DetailPageButtonGroups ⇨ EditButtonにpropsを受け渡している。冗長な気がする。
    const planId = 1;

    return (
        <Container sx={{ mt: 5 }}>
            <PlanDetail />
            <EditPageButtonGroups planId={planId} />
        </Container>
    );
};

export default EditPlanPage;
