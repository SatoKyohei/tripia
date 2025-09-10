"use client";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid2,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import LocationSelectGroups from "@/components/elements/LocationSelect/LocationSelectGroups";
import ChildPlan from "@/components/layouts/ChildPlan";
import { ParentPlan, ChildPlanType } from "@/types/type";
import { getPrefectureIdByAreaId } from "@/data/locationList";
import ImageUploader from "@/components/elements/ImageUploader/ImageUploader";
import Select from "@/components/elements/Select/Select";
import Button from "@/components/elements/Button/Button";
import { conceptList } from "@/data/conceptList";
import { statusList } from "@/data/statusList";

// 課題：ChildPlan.tsxに定義しているhandleChangeをDateTimePickerGroupsに指定。ただ、グローバルの状態管理した方がいいかも

type PlanDetailProps = {
    parentPlan: ParentPlan;
    childPlans: ChildPlanType[];
    setChildPlans: React.Dispatch<React.SetStateAction<ChildPlanType[]>>;
};

const concepts = conceptList.map((concept) => ({
    id: concept.conceptId,
    name: concept.conceptName,
}));

const statuses = statusList.map((status) => ({
    id: status.statusId,
    name: status.statusName,
}));

const PlanDetail = ({ parentPlan, childPlans, setChildPlans }: PlanDetailProps) => {
    const [plan, setPlan] = useState<ParentPlan>(parentPlan);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const router = useRouter();
    const token = localStorage.getItem("access_token");
    const startPrefectureId = getPrefectureIdByAreaId(plan.startAreaId);
    const endPrefectureId = getPrefectureIdByAreaId(plan.endAreaId);

    useEffect(() => {
        if (plan.planThumbnail) setImageURL(plan.planThumbnail);
    }, [plan.planThumbnail]);

    const handleChange = async (parentPlanId: string, key: keyof ParentPlan, value: string) => {
        const updatedPlan = { ...plan, [key]: value };

        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            // credentials: "include",
            body: JSON.stringify(updatedPlan),
        })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error("Failed to save child plan");
                return;
            });

        setPlan(updatedPlan);
    };

    const handleDelete = async (parentPlanId: string) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/${parentPlanId}/delete`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                // credentials: "include",
            },
        );

        if (response.ok) {
            router.push("/plans");
        } else {
            console.error("削除に失敗しました");
        }
        // 課題：一覧ページで削除する場合は、useStateで管理しているplansから除外してあげる必要がある。
    };

    const handleDuplicate = async (parentPlanId: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/duplicate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            // credentials: "include",
            body: JSON.stringify({ parentPlanId }),
        });

        if (response.ok) {
            router.push("/plans");
        } else {
            console.error("Failed to duplicate plan");
        }
        // 課題：一覧ページで複製する場合は、再レンダリングするように処理を追加するだけで勝手に更新されるはず？
    };

    return (
        <Box sx={{ p: 4 }}>
            <Grid2 container spacing={4}>
                {/* 左カラム */}
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
                                parentPlanId={parentPlan.parentPlanId}
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
                                onChange={(e) =>
                                    handleChange(plan.parentPlanId, "purpose", e.target.value)
                                }
                            />
                            <Divider sx={{ my: 3 }} />
                            <Select
                                options={concepts}
                                value={
                                    concepts.find((c) => c.id === plan.conceptId)?.id || "default"
                                }
                                label="旅行のコンセプト"
                                onChange={(value) => {
                                    handleChange(plan.parentPlanId, "conceptId", value);
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid2>

                {/* 右カラム */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardHeader title="場所と時間" />
                        <CardContent>
                            <LocationSelectGroups
                                startPrefectureId={startPrefectureId}
                                startAreaId={plan.startAreaId}
                                endPrefectureId={endPrefectureId}
                                endAreaId={plan.endAreaId}
                                parentPlanId={plan.parentPlanId}
                                handleChange={handleChange}
                            />
                            <Divider sx={{ my: 3 }} />
                            <DateTimePickerGroups
                                startDateTime={plan?.startDateTime ?? ""}
                                endDateTime={plan?.endDateTime ?? ""}
                                onStartDateTimeChange={(value) =>
                                    handleChange(plan.parentPlanId, "startDateTime", value ?? "")
                                }
                                onEndDateTimeChange={(value) =>
                                    handleChange(plan.parentPlanId, "endDateTime", value ?? "")
                                }
                            />
                        </CardContent>
                    </Card>
                </Grid2>

                {/* 子プランセクション */}
                <Grid2 size={{ xs: 12 }}>
                    <Card>
                        <CardHeader title="子プラン" />
                        <CardContent>
                            <ChildPlan
                                parentPlanId={parentPlan.parentPlanId}
                                childPlans={childPlans}
                                setChildPlans={setChildPlans}
                                autoSave={true}
                            />
                        </CardContent>
                    </Card>
                </Grid2>

                {/* 操作ボタン */}
                <Grid2 size={{ xs: 12 }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        <Button
                            label="複製"
                            variant="contained"
                            sx={{ backgroundColor: "#2196F3" }}
                            onClick={() => handleDuplicate(parentPlan.parentPlanId)}
                        />
                        <Button
                            label="削除"
                            variant="contained"
                            sx={{ backgroundColor: "#F44336" }}
                            onClick={() => handleDelete(parentPlan.parentPlanId)}
                        />
                        <Button
                            label="一覧に戻る"
                            variant="contained"
                            sx={{ backgroundColor: "#9E9E9E" }}
                            href="/plans"
                        />
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default PlanDetail;
