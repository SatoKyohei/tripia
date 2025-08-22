import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import { ParentPlan } from "@/types/type";

const BasicPlanListCard = ({ plan }: { plan: ParentPlan }) => {
    return (
        <Link href={`plans/${plan.parentPlanId}`} style={{ textDecoration: "none" }}>
            <Card>
                <CardMedia sx={{ height: 145 }} image={plan.planThumbnail ?? undefined} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {plan.planName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {plan.purpose}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

export default BasicPlanListCard;
