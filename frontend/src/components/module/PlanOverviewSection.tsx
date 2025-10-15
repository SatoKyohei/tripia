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
import { ParentPlanType } from "@/types/type";

type PlanOverviewSectionProps = {
    plan: ParentPlanType;
    handleChange: (parentPlanId: string, key: keyof ParentPlanType, value: string) => void;
    concepts: { id: string; name: string }[];
    statuses: { id: string; name: string }[];
    imageURL: string | null;
    setImageURL: (value: string | null) => void;
    setParentPlan?: (value: ParentPlanType) => void;
    autoUpload?: boolean;
    setImageFile?: (file: File | null) => void;
    isDetailPage?: boolean;
};

const PlanOverviewSection = ({
    plan,
    handleChange,
    statuses,
    imageURL,
    setImageURL,
    setParentPlan,
    concepts,
    autoUpload = false,
    setImageFile,
    isDetailPage = false,
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
                        onChange={(e) => {
                            if (isDetailPage) {
                                setParentPlan?.({ ...plan, planName: e.target.value });
                            } else {
                                handleChange(plan.parentPlanId, "planName", e.target.value);
                            }
                        }}
                        onBlur={
                            isDetailPage
                                ? (e) => handleChange(plan.parentPlanId, "planName", e.target.value)
                                : undefined
                        }
                        sx={{ mb: 2 }}
                    />
                    <Select
                        options={statuses}
                        value={statuses.find((s) => s.id === plan.status)?.id || "default"}
                        label="記事のステータス"
                        onChange={(value) => {
                            handleChange(plan.parentPlanId, "status", value);
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
                        autoUpload={autoUpload}
                        onFileSelect={setImageFile}
                    />
                    <Divider sx={{ my: 3 }} />
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="目的"
                        value={plan.purpose}
                        onChange={(e) => {
                            if (isDetailPage) {
                                setParentPlan?.({ ...plan, purpose: e.target.value });
                            } else {
                                handleChange(plan.parentPlanId, "purpose", e.target.value);
                            }
                        }}
                        onBlur={
                            isDetailPage
                                ? (e) => handleChange(plan.parentPlanId, "purpose", e.target.value)
                                : undefined
                        }
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
