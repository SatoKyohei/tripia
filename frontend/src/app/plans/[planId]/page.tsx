import { Container } from "@mui/material";
import DetailPageButtonGroups from "@/components/elements/Button/DetailPageButtonGroups";
import PlanDetail from "@/components/layouts/PlanDetail";

const PlanDetailPage = () => {
    // 課題：ダミーの指定
    // 課題：DetailPageButtonGroups ⇨ EditButtonにpropsを受け渡している。冗長な気がする。
    const planId = 1;

    return (
        <Container sx={{ mt: 5 }}>
            <PlanDetail />
            <DetailPageButtonGroups planId={planId} />
        </Container>
    );
};

export default PlanDetailPage;
