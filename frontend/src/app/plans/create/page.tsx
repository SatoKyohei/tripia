"use client";
import {
    Box,
    Container,
    FormControlLabel,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import cuid from "cuid";
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
    const [value, setValue] = useState(0);
    const [count, setCount] = useState(1);
    const [isAutoCreatePlan, setIsAutoCreatePlan] = useState<boolean>(true);
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...parentPlan, status }),
            credentials: "include",
        });
        const data = await response.json();
        const newParentPlanId = data.parentPlanId;

        if (!newParentPlanId) throw new Error("親プランの保存に失敗しました");

        return newParentPlanId;
    };

    const saveChildPlans = async (parentPlanId: string) => {
        const promises = childPlans.map((childPlan, index) =>
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...childPlan, parentPlanId, order: index + 1 }),
                credentials: "include",
            }),
        );
        await Promise.all(promises);
    };

    const handleSaveAll = async (status: "Draft" | "Published") => {
        try {
            const parentPlanId = await saveParentPlan(status);
            await saveChildPlans(parentPlanId);
            alert("保存しました");
            router.push("/plans");
        } catch (error) {
            console.error("保存エラー：", error);
            alert("保存に失敗しました");
        }
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Box component="form">
                <Stack spacing={3}>
                    <ImageUploadButton />
                    <TextField
                        required
                        label="プラン名"
                        onChange={(e) => {
                            setParentPlan({ ...parentPlan, planName: e.target.value });
                        }}
                    />
                    <DateTimePickerGroups
                        onStartDateTimeChange={(value) =>
                            setParentPlan((prev) => ({ ...prev, startDateTime: value || "" }))
                        }
                        onEndDateTimeChange={(value) =>
                            setParentPlan((prev) => ({ ...prev, endDateTime: value || "" }))
                        }
                    />
                    <LocationSelectGroups
                        startAreaId={parentPlan.startAreaId}
                        endAreaId={parentPlan.endAreaId}
                        onLocalChange={(key, value) => {
                            setParentPlan((prev) => ({ ...prev, [key]: value }));
                        }}
                    />
                    <BasicConceptSelect
                        onChange={(value) => {
                            setParentPlan({ ...parentPlan, conceptId: value });
                        }}
                    />
                    <TextField
                        required
                        label="旅行の目的"
                        onChange={(e) => {
                            setParentPlan({ ...parentPlan, purpose: e.target.value });
                        }}
                    />
                    {isAutoCreatePlan ? (
                        <>
                            <TextField label="目的地の数" value={count} onChange={handleOnChange} />
                            <CountIconButtonGroups
                                handleCountUp={handleCountUp}
                                handleCountDown={handleCountDown}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isAutoCreatePlan}
                                        onChange={(e) => setIsAutoCreatePlan(e.target.checked)}
                                    />
                                }
                                label="プランを自動生成する"
                            />
                        </>
                    ) : (
                        <>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isAutoCreatePlan}
                                        onChange={(e) => setIsAutoCreatePlan(e.target.checked)}
                                    />
                                }
                                label="プランを自動生成する"
                            />
                            <Typography color="primary" component="h2" variant="h5">
                                子プラン
                            </Typography>
                            <ChildPlan
                                childPlans={childPlans}
                                setChildPlans={setChildPlans}
                                autoSave={false}
                            />
                        </>
                    )}
                </Stack>
            </Box>
            <Stack direction="row" spacing={2} sx={{ m: 3 }}>
                <CreateButton handleClick={() => handleSaveAll("Published")} />
                <DraftButton handleClick={() => handleSaveAll("Draft")} />
                <CancelButton />
            </Stack>
        </Container>
    );
};

export default CreatePlanPage;
