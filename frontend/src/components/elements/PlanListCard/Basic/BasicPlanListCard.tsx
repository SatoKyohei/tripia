import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ParentPlan } from "@/types/type";


const BasicPlanListCard = ({ plan }: { plan: ParentPlan }) => {
    return (
        <Card>
            <CardMedia sx={{ height: 145 }} image="https://picsum.photos/800" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {plan.planName}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {plan.purpose}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BasicPlanListCard;
