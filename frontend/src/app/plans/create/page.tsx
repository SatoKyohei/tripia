"use client";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import BackHandIcon from "@mui/icons-material/BackHand";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import { Box, Container, Stack, Tab, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ImageUploadButton from "@/components/elements/Button/ImageUploadButton";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import CreatePageButtonGroups from "@/components/elements/Button/CreatePageButtonGroups";
import LocationSelectGroups from "@/components/elements/LocationSelect/LocationSelectGroups";
import ChildPlan from "@/components/layouts/ChildPlan";
import BasicLocationSelect from "@/components/elements/LocationSelect/Basic/BasicLocationSelect";
import CountIconButtonGroups from "@/components/elements/IconButton/CountIconButtonGroups";

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

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container sx={{ mt: 5 }}>
            <TabContext value={value}>
                <TabList onChange={handleTabChange}>
                    <Tab icon={<PrecisionManufacturingIcon />} label="自動作成" />
                    <Tab icon={<BackHandIcon />} label="手動作成" />
                </TabList>

                {/* 自動作成 */}
                <TabPanel value={0}>
                    <Box component="form">
                        <Stack spacing={3}>
                            <ImageUploadButton />
                            <TextField required label="プラン名" />
                            <DateTimePickerGroups />
                            <LocationSelectGroups />
                            <BasicLocationSelect label={labels.concept} options={concepts} />
                            <TextField label="目的地の数" value={count} onChange={handleOnChange} />
                            <CountIconButtonGroups
                                handleCountUp={handleCountUp}
                                handleCountDown={handleCountDown}
                            />
                            <TextField label="目的" />
                        </Stack>
                    </Box>
                </TabPanel>

                {/* 手動作成 */}
                <TabPanel value={1}>
                    <Box component="form">
                        <Stack spacing={3}>
                            <ImageUploadButton />
                            <TextField required label="プラン名" />
                            <DateTimePickerGroups />
                            <LocationSelectGroups />
                            <BasicLocationSelect label={labels.concept} options={concepts} />
                            <TextField label="目的" />
                            <Typography color="primary" component="h2" variant="h5">
                                子プラン
                            </Typography>
                            <ChildPlan />
                        </Stack>
                    </Box>
                </TabPanel>
            </TabContext>
            <CreatePageButtonGroups />
        </Container>
    );
};

export default CreatePlanPage;
