"use client";
import React from "react";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/elements/Button/Button"; // Replace Material UI Button

// 課題：Googleアイコンがない
// 課題：<Button></Button>要素で囲むと大文字になる
// 課題：Googleで新規登録した場合、ユーザー名はどう入力させるか
// 課題：レイアウト、レスポンシブ
// 課題：<Divider>が効かない

const SignUpPage = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleSignUp = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "ユーザーの作成に失敗しました");
            }

            alert(data.message);
            router.push("/signin");
        } catch (error) {
            alert(error || "ユーザーの作成に失敗しました");
        }
    };

    return (
        <Stack
            flexDirection="column"
            alignItems="center"
            spacing={3}
            sx={{
                maxWidth: "400px",
                margin: "0 auto",
                borderRadius: "5px",
                boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.35)",
                paddingTop: "40px",
                paddingBottom: "40px",
                mt: 5,
            }}
        >
            <Typography variant="h5" component="h2">
                Sign Up
            </Typography>
            <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="small"
                label="Name"
                sx={{ width: "80%" }}
            />
            <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                label="Email"
                sx={{ width: "80%" }}
            />
            <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small"
                label="Password"
                type="password"
                sx={{ width: "80%" }}
            />
            <Button
                label="Sign Up"
                variant="contained"
                onClick={handleSignUp}
                sx={{ width: "80%" }}
            />
            <Divider>
                <Typography sx={{ color: "text.secondary" }}>or</Typography>
            </Divider>
            <Button
                label="Sign Up With Google"
                variant="contained"
                sx={{
                    width: "80%",
                    backgroundColor: "#fff",
                    color: "black",
                    border: "1px solid",
                    boxShadow: "none",
                    padding: "10px 0",
                    fontWeight: "normal",
                }}
            />
        </Stack>
    );
};

export default SignUpPage;
