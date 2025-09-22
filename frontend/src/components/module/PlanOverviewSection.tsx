import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid2,
    TextField,
    Typography,
} from "@mui/material";
import ImageUploader from "@/components/elements/ImageUploader/ImageUploader";
import Select from "@/components/elements/Select/Select";
import { ParentPlan } from "@/types/type";

type PlanOverviewSectionProps = {
    plan: ParentPlan;
    handleChange: (parentPlanId: string, key: keyof ParentPlan, value: string) => void;
    concepts: { id: string; name: string }[];
    statuses: { id: string; name: string }[];
    imageURL: string | null;
    setImageURL: (value: string | null) => void;
};

const PlanOverviewSection = ({
    plan,
    handleChange,
    statuses,
    imageURL,
    setImageURL,
    concepts,
}: PlanOverviewSectionProps) => {
    return (
        <Grid2 size={{ xs: 12, md: 6 }}>
            <Card>
                <CardHeader title="プラン概要" />
                <CardContent>
                    <TextField
                        fullWidth
                        label="タイトル"
                        value={plan.planName}
                        onChange={(e) =>
                            handleChange(plan.parentPlanId, "planName", e.target.value)
                        }
                        sx={{ mb: 2 }}
                    />
                    <Select
                        options={statuses}
                        value={statuses.find((s) => s.id === plan.status)?.id || "default"}
                        label="記事のステータス"
                        onChange={(value) => {
                            handleChange(plan.status, "status", value);
                        }}
                    />
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        サムネイル画像
                    </Typography>
                    <ImageUploader
                        parentPlanId={plan.parentPlanId}
                        imageURL={imageURL}
                        setImageURL={setImageURL}
                        autoUpload={true}
                    />
                    <Divider sx={{ my: 3 }} />
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="目的"
                        value={plan.purpose}
                        onChange={(e) => handleChange(plan.parentPlanId, "purpose", e.target.value)}
                    />
                    <Divider sx={{ my: 3 }} />
                    <Select
                        options={concepts}
                        value={concepts.find((c) => c.id === plan.conceptId)?.id || "default"}
                        label="旅行のコンセプト"
                        onChange={(value) => {
                            handleChange(plan.parentPlanId, "conceptId", value);
                        }}
                    />
                </CardContent>
            </Card>
        </Grid2>
    );
};

export default PlanOverviewSection;
