import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import { ParentPlan } from "@/types/type";

const BasicPlanListCard = ({ plan }: { plan: ParentPlan }) => {
    return (
        <Link href={`plans/${plan.parentPlanId}`} style={{ textDecoration: "none" }}>
            <Card
                sx={{
                    height: "100%",
                    borderRadius: 2,
                    boxShadow: 2,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                    },
                }}
            >
                {/* サムネイル */}
                <CardMedia
                    component="img"
                    height="160"
                    image={plan.planThumbnail ?? "/default-thumbnail.png"}
                    alt={plan.planName}
                    sx={{ objectFit: "cover" }}
                />

                {/* テキスト部分 */}
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                        {plan.planName}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ height: "40px", overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                        {plan.purpose || "目的が未設定です"}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

export default BasicPlanListCard;

