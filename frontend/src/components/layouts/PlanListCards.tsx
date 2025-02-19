import { Grid2 } from "@mui/material";
import BasicPlanListCard from "@/components/elements/PlanListCard/Basic/BasicPlanListCard";

// 課題：カラム数を調整（レスポンシブ）
// 課題：Gridが理解できない

type plan = {
    id: number;
    name: string;
    content: string;
};

type PlanListCardsProps = {
    plans: plan[];
};

const PlanListCards = ({ plans }: PlanListCardsProps) => {
    return (
        <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {plans.map((plan) => (
                <Grid2 key={plan.id} size={{ xs: 2, sm: 4, md: 4 }}>
                    <BasicPlanListCard plan={plan} />
                </Grid2>
            ))}
        </Grid2>
    );
};

export default PlanListCards;
