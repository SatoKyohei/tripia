"use client";
import { Box, Card, CardContent, CardHeader, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChildPlan from "@/components/layouts/ChildPlan";
import { ParentPlan, ChildPlanType } from "@/types/type";
import { getFilterdAreaList, getPrefectureIdByAreaId, prefectureList } from "@/data/locationList";
import Button from "@/components/elements/Button/Button";
import { conceptList } from "@/data/conceptList";
import { statusList } from "@/data/statusList";
import { deleteParentPlan, duplicateParentPlan, updateParentPlan } from "@/services/parentPlanApi";
import PlanOverviewSection from "@/components/module/PlanOverviewSection";
import PlanLocationAndDatetimeSection from "@/components/module/PlanLocationAndDatetimeSection";


type PlanDetailProps = {
    parentPlan: ParentPlan;
    childPlans: ChildPlanType[];
    setChildPlans: React.Dispatch<React.SetStateAction<ChildPlanType[]>>;
};

// セレクトボックス用のオプション化
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

    // エリアセレクトボックスの絞り込み用state
    const [startPrefectureId, setStartPrefectureId] = useState<string | undefined>(
        getPrefectureIdByAreaId(plan.startAreaId),
    );
    const [endPrefectureId, setEndPrefectureId] = useState<string | undefined>(
        getPrefectureIdByAreaId(plan.endAreaId),
    );

    // エリアリストの絞り込み
    const filterdStartAreaList = getFilterdAreaList(startPrefectureId);
    const filterdEndAreaList = getFilterdAreaList(endPrefectureId);

    const router = useRouter();
    const token = localStorage.getItem("access_token");

    // planThumbnail が変わったら imageURL を更新
    useEffect(() => {
        if (plan.planThumbnail) setImageURL(plan.planThumbnail);
    }, [plan.planThumbnail]);

    // 親プラン更新処理
    const handleChange = async (parentPlanId: string, key: keyof ParentPlan, value: string) => {
        const updatedPlan = { ...plan, [key]: value };

        try {
            await updateParentPlan(updatedPlan, token ?? "");
            setPlan(updatedPlan);
        } catch (error) {
            console.error("親プラン更新に失敗しました:", error);
        }
    };

    // 親プラン削除処理
    const handleDelete = async (parentPlanId: string) => {
        try {
            await deleteParentPlan(parentPlanId, token ?? "");
            router.push("/plans");
        } catch (error) {
            console.error("削除に失敗しました");
        }
    };

    // 親プラン複製処理
    const handleDuplicate = async (parentPlanId: string) => {
        try {
            await duplicateParentPlan(parentPlanId, token ?? "");
            router.push("/plans");
        } catch (error) {
            console.error("Failed to duplicate plan");
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Grid2 container spacing={4}>
                {/* 左カラム */}
                <PlanOverviewSection
                    plan={plan}
                    handleChange={handleChange}
                    concepts={concepts}
                    statuses={statuses}
                    imageURL={imageURL}
                    setImageURL={setImageURL}
                />

                {/* 右カラム */}
                <PlanLocationAndDatetimeSection
                    plan={plan}
                    handleChange={handleChange}
                    startPrefectureId={startPrefectureId}
                    endPrefectureId={endPrefectureId}
                    setStartPrefectureId={setStartPrefectureId}
                    setEndPrefectureId={setEndPrefectureId}
                    prefectureList={prefectureList}
                    filterdStartAreaList={filterdStartAreaList}
                    filterdEndAreaList={filterdEndAreaList}
                />

                {/* 子プランセクション */}
                <Grid2 size={{ xs: 12 }}>
                    <Card>
                        <CardHeader title="子プラン" />
                        <CardContent>
                            <ChildPlan
                                parentPlanId={plan.parentPlanId}
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
                            onClick={() => handleDuplicate(plan.parentPlanId)}
                        />
                        <Button
                            label="削除"
                            variant="contained"
                            sx={{ backgroundColor: "#F44336" }}
                            onClick={() => handleDelete(plan.parentPlanId)}
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
