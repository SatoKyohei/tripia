"use client";
import { Box, Card, CardContent, CardHeader, Container, Grid2 } from "@mui/material";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ParentPlanType, ChildPlanType } from "@/types/type";
import {
    fetchParentPlan,
    deleteParentPlan,
    duplicateParentPlan,
    updateParentPlan,
} from "@/services/parentPlanApi";
import { getFilteredAreaList, getPrefectureIdByAreaId, prefectureList } from "@/data/locationList";
import Button from "@/components/elements/Button/Button";
import { conceptList } from "@/data/conceptList";
import { statusList } from "@/data/statusList";
import ChildPlanSection from "@/components/layouts/ChildPlanSection";
import PlanOverviewSection from "@/components/module/PlanOverviewSection";
import PlanLocationAndDatetimeSection from "@/components/module/PlanLocationAndDatetimeSection";

const PlanDetailPage = ({ params }: { params: Promise<{ parentPlanId: string }> }) => {
    // 状態管理
    const [parentPlan, setParentPlan] = useState<ParentPlanType | undefined>(undefined);
    const [childPlans, setChildPlans] = useState<ChildPlanType[]>([]);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [startPrefectureId, setStartPrefectureId] = useState<string | undefined>(undefined);
    const [endPrefectureId, setEndPrefectureId] = useState<string | undefined>(undefined);

    const router = useRouter(); // ルーター
    const token = localStorage.getItem("access_token"); // 認証トークン

    // params を非同期的にアンラップ
    const { parentPlanId } = use(params);

    // セレクトボックス用のオプション化
    const concepts = conceptList.map((concept) => ({
        id: concept.conceptId,
        name: concept.conceptName,
    }));

    const statuses = statusList.map((status) => ({
        id: status.statusId,
        name: status.statusName,
    }));

    // エリアリストの絞り込み
    const filteredStartAreaList = getFilteredAreaList(startPrefectureId);
    const filteredEndAreaList = getFilteredAreaList(endPrefectureId);


    // 初回レンダリング時に親プランと子プランを取得
    useEffect(() => {
        const loadPlanData = async (parentPlanId: string) => {
            try {
                const planData = await fetchParentPlan(parentPlanId, token ?? "");
                setParentPlan(planData.parentPlan);
                setChildPlans(planData.childPlans);
                setStartPrefectureId(getPrefectureIdByAreaId(planData.parentPlan.startAreaId));
                setEndPrefectureId(getPrefectureIdByAreaId(planData.parentPlan.endAreaId));
                if (planData.parentPlan.planThumbnail) {
                    setImageURL(planData.parentPlan.planThumbnail);
                }
            } catch (error) {
                console.error("データの取得に失敗しました:", error);
            }
        };

        loadPlanData(parentPlanId);
    }, [parentPlanId, token]);

    // 親プラン更新処理
    const handleChange = async (parentPlanId: string, key: keyof ParentPlanType, value: string) => {
        if (!parentPlan) return;
        const updatedPlan = { ...parentPlan, [key]: value };

        try {
            await updateParentPlan(updatedPlan, token ?? "");
            setParentPlan(updatedPlan);
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
        <Container sx={{ mt: 5 }}>
            {parentPlan && (
                <Box sx={{ p: 4 }}>
                    <Grid2 container spacing={4}>
                        {/* 左カラム */}
                        <PlanOverviewSection
                            plan={parentPlan}
                            setParentPlan={setParentPlan}
                            handleChange={handleChange}
                            concepts={concepts}
                            statuses={statuses}
                            imageURL={imageURL}
                            setImageURL={setImageURL}
                            autoUpload={true}
                            isDetailPage={true}
                        />

                        {/* 右カラム */}
                        <PlanLocationAndDatetimeSection
                            plan={parentPlan}
                            handleChange={handleChange}
                            startPrefectureId={startPrefectureId}
                            endPrefectureId={endPrefectureId}
                            setStartPrefectureId={setStartPrefectureId}
                            setEndPrefectureId={setEndPrefectureId}
                            prefectureList={prefectureList}
                            filteredStartAreaList={filteredStartAreaList}
                            filteredEndAreaList={filteredEndAreaList}
                        />

                        {/* 子プランセクション */}
                        <Grid2 size={{ xs: 12 }}>
                            <Card>
                                <CardHeader title="子プラン" />
                                <CardContent>
                                    <ChildPlanSection
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
            )}
        </Container>
    );
};

export default PlanDetailPage;
