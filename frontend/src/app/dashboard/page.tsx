"use client";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Grid2,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@/components/elements/Button/Button"; // Replace Material UI Button

const DashboardPage = () => {
    const [thumbnail, setThumbnail] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) throw new Error("ユーザー取得に失敗しました");

                setThumbnail(data.profileThumbnail);
                setName(data.name);
                setEmail(data.email);
            } catch (error) {
                console.error(error);
                throw new Error("ユーザー取得に失敗しました");
            }
        };

        fetchData();
    }, []);

    return (
        <Box sx={{ p: 4, maxWidth: "900px", margin: "0 auto" }}>
            <Stack spacing={3} alignItems="center">
                {/* プロフィール */}
                <Avatar src={thumbnail} alt="profile" sx={{ width: 120, height: 120, mb: 1 }} />
                <Typography variant="h5" component="div">
                    {name}
                </Typography>

                <Grid2 container spacing={3}>
                    {/* ユーザー情報カード */}
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Card sx={{ p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    ユーザー情報
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Stack spacing={2}>
                                    <TextField
                                        label="ユーザー名"
                                        variant="outlined"
                                        size="small"
                                        value={name}
                                        disabled={!isEditing}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        size="small"
                                        value={email}
                                        disabled={!isEditing}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Button
                                        label={isEditing ? "保存" : "変更する"}
                                        variant="contained"
                                        onClick={() => setIsEditing((prev) => !prev)}
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid2>

                    {/* ユーザー統計カード */}
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Card sx={{ p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    アクティビティ
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Stack spacing={2}>
                                    <Typography variant="body1">作成したプラン数：5</Typography>
                                    <Typography variant="body1">参加予定のプラン：2</Typography>
                                    <Typography variant="body1">お気に入りの場所：3</Typography>
                                    <Button label="もっと見る" variant="outlined" />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid2>

                    {/* オプションカード例 */}
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Card sx={{ p: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    アカウント操作
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Stack direction="row" spacing={2}>
                                    <Button label="ログアウト" variant="contained" color="error" />
                                    <Button
                                        label="アカウント削除"
                                        variant="outlined"
                                        color="secondary"
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            </Stack>
        </Box>
    );
};

export default DashboardPage;
