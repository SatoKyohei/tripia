"use client";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Container,
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
import ImageUploadButton from "@/components/elements/Button/ImageUploadButton";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import LocationSelectGroups from "@/components/elements/LocationSelect/LocationSelectGroups";
import ChildPlan from "@/components/layouts/ChildPlan";
import CountIconButtonGroups from "@/components/elements/IconButton/CountIconButtonGroups";
import CreateButton from "@/components/elements/Button/CreateButton";
import DraftButton from "@/components/elements/Button/DraftButton";
import CancelButton from "@/components/elements/Button/CancelButton";
import BasicConceptSelect from "@/components/elements/ConceptSelect/Basic/BasicConceptSelect";
import { ChildPlanType } from "@/types/type";
import ImageUploader from "@/components/elements/ImageUploader/ImageUploader";
import { uploadImage } from "@/services/uploadImage";

// 課題：createページじゃなくてモーダルで表現した方がカッコいいかも？
// 課題：作成中にやっぱ手動作成に変えたいってなった時、情報が保持されるようにする
// 課題：サムネ画像のアップロード実装

// 課題：ここで定義で本当に良いのか
const labels = { concept: "旅行のコンセプト" };
const concepts = [
    { id: 1, name: "リラックス" },
    { id: 2, name: "アクティブな旅行" },
    { id: 3, name: "現地で交流" },
    { id: 4, name: "貧乏旅" },
    { id: 5, name: "卒業旅行" },
];

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
        const newParentPlanId = data.parentPlanId;

        if (!newParentPlanId) throw new Error("親プランの保存に失敗しました");

        return newParentPlanId;
    };

    const saveChildPlans = async (parentPlanId: string) => {
        const token = localStorage.getItem("access_token");
        const promises = childPlans.map((childPlan, index) =>
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...childPlan, parentPlanId, order: index + 1 }),
                credentials: "include",
            }),
        );
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
                            {/* <ImageUploadButton /> */}
                            <ImageUploader
                                imageURL={imageURL}
                                setImageURL={setImageURL}
                                autoUpload={false}
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
                            <BasicConceptSelect
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
                                startAreaId={parentPlan.startAreaId}
                                endAreaId={parentPlan.endAreaId}
                                onLocalChange={(key, value) => {
                                    setParentPlan((prev) => ({ ...prev, [key]: value }));
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
                                    <CountIconButtonGroups
                                        handleCountUp={handleCountUp}
                                        handleCountDown={handleCountDown}
                                    />
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
                        <CreateButton handleClick={() => handleSaveAll("Published")} />
                        <DraftButton handleClick={() => handleSaveAll("Draft")} />
                        <CancelButton />
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default CreatePlanPage;
