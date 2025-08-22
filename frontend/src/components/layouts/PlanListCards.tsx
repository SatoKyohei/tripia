import { Grid2 } from "@mui/material";
import BasicPlanListCard from "@/components/elements/PlanListCard/Basic/BasicPlanListCard";
import { ParentPlan } from "@/types/type";

// 課題：カラム数を調整（レスポンシブ）
// 課題：Gridが理解できない

const PlanListCards = ({ plans }: { plans: ParentPlan[] }) => {
    return (
        <Grid2 container spacing={3}>
            {plans.map((plan) => (
                <Grid2 key={plan.parentPlanId} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <BasicPlanListCard plan={plan} />
                </Grid2>
            ))}
        </Grid2>
    );
};

export default PlanListCards;

