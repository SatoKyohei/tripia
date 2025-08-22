import { Grid2 } from "@mui/material";
import BasicPlanListCard from "@/components/elements/PlanListCard/Basic/BasicPlanListCard";
import { ParentPlan } from "@/types/type";

// 課題：カラム数を調整（レスポンシブ）
// 課題：Gridが理解できない

const PlanListCards = ({ plans }: { plans: ParentPlan[] }) => {
    return (
        <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {plans.map((plan) => (
                <Grid2 key={plan.parentPlanId} size={{ xs: 2, sm: 4, md: 4 }}>
                    <BasicPlanListCard plan={plan} />
                </Grid2>
            ))}
        </Grid2>
    );
};

export default PlanListCards;

// const PlanListCards = ({ plans }: { plans: ParentPlan[] }) => {
//   return (
//     <Grid container spacing={3}>
//       {plans.map((plan) => (
//         <Grid key={plan.parentPlanId} item xs={12} sm={6} md={4} lg={3}>
//           <BasicPlanListCard plan={plan} />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };
