"use client";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControlLabel,
    Grid2,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import LocationSelectGroups from "@/components/elements/LocationSelect/LocationSelectGroups";
import ChildPlan from "@/components/layouts/ChildPlan";
import Button from "@/components/elements/Button/Button";
import { ChildPlanType } from "@/types/type";
import ImageUploader from "@/components/elements/ImageUploader/ImageUploader";
import { uploadImage } from "@/services/uploadImage";
import Select from "@/components/elements/Select/Select";
import { conceptList } from "@/data/conceptList";
import CountUpIconButton from "@/components/elements/IconButton/CountUpIconButton";
import CountDownIconButton from "@/components/elements/IconButton/CountDownIconButton";
import { getFilterdAreaList, getPrefectureIdByAreaId, prefectureList } from "@/data/locationList";

// 課題：createページじゃなくてモーダルで表現した方がカッコいいかも？
// 課題：作成中にやっぱ手動作成に変えたいってなった時、情報が保持されるようにする
// 課題：サムネ画像のアップロード実装

// 課題：ここで定義で本当に良いのか
const labels = { concept: "旅行のコンセプト" };

const concepts = conceptList.map((concept) => ({
    id: concept.conceptId,
    name: concept.conceptName,
}));

const CreatePlanPage = () => {
    const [count, setCount] = useState(1);
    const [isAutoCreatePlan, setIsAutoCreatePlan] = useState<boolean>(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [parentPlan, setParentPlan] = useState({
        planName: "",
        planThumbnail: "",
        startDateTime: "",
        endDateTime: "",
        purpose: "",
        status: "",
        startAreaId: "",
        endAreaId: "",
        conceptId: "",
    });
    const [childPlans, setChildPlans] = useState<ChildPlanType[]>([]);

    const [startPrefectureId, setStartPrefectureId] = useState<string | undefined>(
        getPrefectureIdByAreaId(parentPlan.startAreaId),
    );
    const [endPrefectureId, setEndPrefectureId] = useState<string | undefined>(
        getPrefectureIdByAreaId(parentPlan.endAreaId),
    );

    const filterdStartAreaList = getFilterdAreaList(startPrefectureId);
    const filterdEndAreaList = getFilterdAreaList(endPrefectureId);

    const router = useRouter();

    const handleCountUp = () => {
        setCount((prev) => (prev < 50 ? prev + 1 : 50));
    };

    const handleCountDown = () => {
        setCount((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);
        if (!isNaN(newValue) && newValue >= 1 && newValue <= 50) {
            setCount(newValue);
        }
    };

    // 親プラン保存
    const saveParentPlan = async (status: "Draft" | "Published") => {
        const token = localStorage.getItem("access_token");

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...parentPlan, status }),
            // credentials: "include",
        });

        const data = await response.json();
        // parentPlanId, userId, createdAt, updatedAtがないエラー。Omitする？
        //  const requestPlanData = { ...parentPlan, status };

        // const data = await createParentPlan(requestPlanData, token ?? "");

        const newParentPlanId = data.parentPlanId;

        if (!newParentPlanId) throw new Error("親プランの保存に失敗しました");

        return newParentPlanId;
    };

    const saveChildPlans = async (parentPlanId: string) => {
        const token = localStorage.getItem("access_token");

        const promises = childPlans.map((childPlan, index) => {
            const payload = {
                childPlanId: childPlan.childPlanId,
                locationName: childPlan.locationName,
                checkInTime: childPlan.checkInTime,
                checkOutTime: childPlan.checkOutTime,
                memo: childPlan.memo,
                userId: childPlan.userId,
                parentPlanId,
                order: index + 1,
            };

            return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
                credentials: "include",
            });
        });

        await Promise.all(promises);
    };

    const handleSaveAll = async (status: "Draft" | "Published") => {
        try {
            // Step1: まず親プランをDBに保存してIDを取得
            const parentPlanId = await saveParentPlan(status);

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
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardHeader title="プラン概要" />
                        <CardContent>
                            {/* プラン名 */}
                            <TextField
                                fullWidth
                                label="タイトル"
                                value={parentPlan.planName}
                                onChange={(e) =>
                                    setParentPlan({ ...parentPlan, planName: e.target.value })
                                }
                                sx={{ mb: 2 }}
                            />

                            {/* 概要画像 */}
                            <Divider sx={{ my: 3 }} />
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                サムネイル画像
                            </Typography>
                            <ImageUploader
                                imageURL={imageURL}
                                setImageURL={setImageURL}
                                onFileSelect={(file) => setImageFile(file)}
                            />

                            {/* 旅行目的 */}
                            <Divider sx={{ my: 3 }} />
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="旅行の目的"
                                value={parentPlan.purpose}
                                onChange={(e) =>
                                    setParentPlan({ ...parentPlan, purpose: e.target.value })
                                }
                            />

                            {/* コンセプト選択 */}
                            <Divider sx={{ my: 3 }} />
                            <Select
                                options={concepts}
                                value={parentPlan.conceptId || "default"}
                                label="旅行のコンセプト"
                                onChange={(value) => {
                                    setParentPlan({ ...parentPlan, conceptId: value });
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid2>

                {/* 右カラム：場所と時間 */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardHeader title="場所と時間" />
                        <CardContent>
                            {/* 場所選択 */}
                            <LocationSelectGroups
                                startPrefectureId={startPrefectureId}
                                startAreaId={parentPlan.startAreaId}
                                endPrefectureId={endPrefectureId}
                                endAreaId={parentPlan.endAreaId}
                                prefectureOptions={prefectureList}
                                startAreaOptions={filterdStartAreaList}
                                endAreaOptions={filterdEndAreaList}
                                onChange={(key, value) => {
                                    if (key === "startPrefectureId") {
                                        setStartPrefectureId(value);
                                        // prefecture変更時に areaId をリセットするのもアリ
                                    } else if (key === "endPrefectureId") {
                                        setEndPrefectureId(value);
                                    } else {
                                        // areaId は parentPlan に保存
                                        setParentPlan((prev) => ({ ...prev, [key]: value }));
                                    }
                                }}
                            />

                            {/* 日時 */}
                            <Divider sx={{ my: 3 }} />
                            <DateTimePickerGroups
                                onStartDateTimeChange={(value) =>
                                    setParentPlan((prev) => ({
                                        ...prev,
                                        startDateTime: value || "",
                                    }))
                                }
                                onEndDateTimeChange={(value) =>
                                    setParentPlan((prev) => ({ ...prev, endDateTime: value || "" }))
                                }
                            />

                            {/* 自動生成の切り替え */}
                            <Divider sx={{ my: 3 }} />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isAutoCreatePlan}
                                        onChange={(e) => setIsAutoCreatePlan(e.target.checked)}
                                    />
                                }
                                label="プランを自動生成する"
                            />
                            {isAutoCreatePlan && (
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ mt: 2 }}
                                    alignItems="center"
                                >
                                    <TextField
                                        label="目的地の数"
                                        value={count}
                                        onChange={handleOnChange}
                                        inputProps={{ readOnly: true }}
                                        sx={{ width: 120 }}
                                    />
                                    <CountUpIconButton handleCountUp={handleCountUp} />
                                    <CountDownIconButton handleCountDown={handleCountDown} />
                                </Stack>
                            )}
                        </CardContent>
                    </Card>
                </Grid2>

                {/* 子プランセクション */}
                {!isAutoCreatePlan && (
                    <Grid2 size={{ xs: 12 }}>
                        <Card>
                            <CardHeader title="子プラン" />
                            <CardContent>
                                <ChildPlan
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
                        <Button
                            label="公開"
                            onClick={() => handleSaveAll("Published")}
                            variant="contained"
                            sx={{ backgroundColor: "#4CAF50" }}
                        />
                        <Button
                            label="下書き"
                            onClick={() => handleSaveAll("Draft")}
                            variant="contained"
                            sx={{ backgroundColor: "#FFC107" }}
                        />
                        <Button
                            label="一覧に戻る"
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
