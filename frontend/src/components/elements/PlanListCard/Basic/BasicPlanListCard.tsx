import { Card, CardContent, CardMedia, Typography } from "@mui/material";

type BasicPlanListCardProps = {
    id: number;
    name: string;
    content: string;
};

const BasicPlanListCard = ({ plan }: { plan: BasicPlanListCardProps }) => {
    return (
        <Card>
            <CardMedia sx={{ height: 145 }} image="https://picsum.photos/800" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {plan.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {plan.content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BasicPlanListCard;
