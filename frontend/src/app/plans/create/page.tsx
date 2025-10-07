"use client";
import { Box, Card, CardContent, CardHeader, Grid2 } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ChildPlanSection from "@/components/layouts/ChildPlanSection";
import Button from "@/components/elements/Button/Button";
import { ChildPlanType, ParentPlanType } from "@/types/type";
import { uploadImage } from "@/services/uploadImageApi";
import { conceptList } from "@/data/conceptList";
import { getFilterdAreaList, getPrefectureIdByAreaId, prefectureList } from "@/data/locationList";
import PlanOverviewSection from "@/components/module/PlanOverviewSection";
import PlanLocationAndDatetimeSection from "@/components/module/PlanLocationAndDatetimeSection";
import { createParentPlan } from "@/services/parentPlanApi";
import { createChildPlan } from "@/services/childPlanApi";

const CreatePlanPage = () => {
    const [childPlanCount, setChildPlanCount] = useState(1);
    const [isAutoCreatePlan, setIsAutoCreatePlan] = useState<boolean>(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [parentPlan, setParentPlan] = useState<ParentPlanType>({
        planName: "",
        planThumbnail: "",
        startDateTime: "",
        endDateTime: "",
        purpose: "",
        status: "Draft",
        startAreaId: "",
        endAreaId: "",
        conceptId: "",
        parentPlanId: "temp-id",
        userId: "temp-user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    const [childPlans, setChildPlans] = useState<ChildPlanType[]>([]);

    // エリアセレクトボックスの絞り込み用state
    const [startPrefectureId, setStartPrefectureId] = useState<string | undefined>(
        getPrefectureIdByAreaId(parentPlan.startAreaId),
    );

    const [endPrefectureId, setEndPrefectureId] = useState<string | undefined>(
        getPrefectureIdByAreaId(parentPlan.endAreaId),
    );

    // ルーター
    const router = useRouter();

    // 旅行のコンセプトの定義
    const labels = { concept: "旅行のコンセプト" };

    const concepts = conceptList.map((concept) => ({
        id: concept.conceptId,
        name: concept.conceptName,
    }));

    // エリアリストの絞り込み
    const filterdStartAreaList = getFilterdAreaList(startPrefectureId);
    const filterdEndAreaList = getFilterdAreaList(endPrefectureId);

    // 自動生成する場合の子プランの数の変更
    const incrementChildPlanCount = () => {
        setChildPlanCount((prev) => (prev < 50 ? prev + 1 : 50));
    };

    const decrementChildPlanCount = () => {
        setChildPlanCount((prev) => (prev > 1 ? prev - 1 : 1));
    };

    // 親プラン情報変更
    const handleParentPlanChange = (parentPlanId: string, key: keyof ParentPlanType, value: string) => {
        setParentPlan((prev) => ({ ...prev, [key]: value }));
    };

    // 親プラン保存
    const saveParentPlan = async () => {
        const token = localStorage.getItem("access_token");

        try {
            const newParentPlanId = await createParentPlan(parentPlan, token ?? "");

            if (!newParentPlanId) throw new Error("親プランの保存に失敗しました");

            return newParentPlanId;
        } catch (error) {
            console.error("親プラン保存エラー:", error);
        }
    };

    // 子プラン保存
    const saveChildPlans = async (parentPlanId: string) => {
        const token = localStorage.getItem("access_token");

        const promises = childPlans.map((childPlan, index) => {
            const payload = {
                locationName: childPlan.locationName,
                checkInTime: childPlan.checkInTime,
                checkOutTime: childPlan.checkOutTime,
                memo: childPlan.memo,
                userId: childPlan.userId,
                parentPlanId,
                order: index + 1,
            };

            return createChildPlan(payload, token ?? "");
        });

        await Promise.all(promises);
    };

    // プラン全体を保存する処理（作成ボタン押下時）
    const handleSaveAll = async () => {
        try {
            // Step1: まず親プランをDBに保存してIDを取得
            const parentPlanId = await saveParentPlan();

            // Step2: 画像が選択されていればアップロード
            if (imageFile) {
                await uploadImage({ parentPlanId, file: imageFile });
            }

            // Step3: 子プラン保存
            await saveChildPlans(parentPlanId);

            alert("保存しました");
            router.push("/plans");
        } catch (error) {
            console.error("保存エラー：", error);
            alert("保存に失敗しました");
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Grid2 container spacing={4} alignItems="stretch">
                {/* 左カラム：プラン概要 */}
                <PlanOverviewSection
                    plan={parentPlan}
                    handleChange={handleParentPlanChange}
                    concepts={concepts}
                    statuses={[
                        { id: "Draft", name: "下書き" },
                        { id: "Published", name: "公開" },
                    ]}
                    imageURL={imageURL}
                    setImageURL={setImageURL}
                />

                {/* 右カラム：場所と時間 */}
                <PlanLocationAndDatetimeSection
                    plan={parentPlan}
                    handleChange={handleParentPlanChange}
                    startPrefectureId={startPrefectureId}
                    endPrefectureId={endPrefectureId}
                    setStartPrefectureId={setStartPrefectureId}
                    setEndPrefectureId={setEndPrefectureId}
                    prefectureList={prefectureList}
                    filterdStartAreaList={filterdStartAreaList}
                    filterdEndAreaList={filterdEndAreaList}
                    isAutoCreatePlan={isAutoCreatePlan}
                    childPlanCount={childPlanCount}
                    incrementChildPlanCount={incrementChildPlanCount}
                    decrementChildPlanCount={decrementChildPlanCount}
                    handleAutoCreateToggle={(checked) => setIsAutoCreatePlan(checked)}
                />

                {/* 子プランセクション */}
                {!isAutoCreatePlan && (
                    <Grid2 size={{ xs: 12 }}>
                        <Card>
                            <CardHeader title="子プラン" />
                            <CardContent>
                                <ChildPlanSection
                                    childPlans={childPlans}
                                    setChildPlans={setChildPlans}
                                    autoSave={false}
                                />
                            </CardContent>
                        </Card>
                    </Grid2>
                )}

                {/* 操作ボタン */}
                <Grid2 size={{ xs: 12 }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                        {/* 作成ボタン */}
                        <Button
                            label="作成"
                            onClick={() => handleSaveAll()}
                            variant="contained"
                            sx={{ backgroundColor: "#4CAF50" }}
                        />
                        {/* キャンセルボタン */}
                        <Button
                            label="キャンセル"
                            href="/plans"
                            variant="contained"
                            sx={{ backgroundColor: "#9E9E9E" }}
                        />
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default CreatePlanPage;
