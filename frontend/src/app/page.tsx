"use client";

import { Box, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import Button from "@/components/elements/Button/Button"; // Replace Material UI Button

export default function Home() {
    return (
        <main>
            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    py: 10,
                    textAlign: "center",
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h2" component="h1" gutterBottom>
                        あなたの旅をもっと自由に
                    </Typography>
                    <Typography variant="h6" component="p" gutterBottom>
                        Tripiaで旅のプランを作成・共有して、新しい旅先を見つけよう
                    </Typography>
                    <Button
                        label="プランを作成"
                        variant="contained"
                        color="secondary"
                        size="large"
                        sx={{ mt: 4 }}
                        href="/plans/create"
                    />
                </Container>
            </Box>

            {/* 人気の旅行先 Section */}
            <Container sx={{ py: 8 }}>
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    人気の旅行先
                </Typography>
                <Grid container spacing={4} sx={{ mt: 2 }}>
                    {[
                        { title: "東京", image: "/tokyo.jpg" },
                        { title: "京都", image: "/kyoto.jpg" },
                        { title: "沖縄", image: "/okinawa.jpg" },
                    ].map((dest, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                <CardMedia
                                    component="img"
                                    sx={{ height: 200 }}
                                    image={dest.image}
                                    alt={dest.title}
                                />
                                <CardContent>
                                    <Typography variant="h6">{dest.title}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* 使い方 Section */}
            <Box sx={{ bgcolor: "grey.100", py: 8 }}>
                <Container>
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                        使い方
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        {[
                            { step: "1", text: "サインアップ / ログインする" },
                            { step: "2", text: "旅のプランを作成する" },
                            { step: "3", text: "みんなと共有する" },
                        ].map((item, index) => (
                            <Grid key={index} size={{ xs: 12, md: 4 }} textAlign="center">
                                <Typography variant="h3" color="primary" gutterBottom>
                                    {item.step}
                                </Typography>
                                <Typography variant="h6">{item.text}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Footer Section */}
            <Box sx={{ bgcolor: "primary.dark", color: "white", py: 4, textAlign: "center" }}>
                <Typography variant="body2">
                    © {new Date().getFullYear()} Tripia. All rights reserved.
                </Typography>
            </Box>
        </main>
    );
}
