"use client";
import React, { useState } from "react";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/elements/Button/Button";

// スタイルを外部に定義
const styles = {
    container: {
        maxWidth: "400px",
        margin: "0 auto",
        borderRadius: "5px",
        boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.35)",
        paddingTop: "40px",
        paddingBottom: "40px",
        mt: 5,
    },
    input: {
        width: "80%",
    },
    googleButton: {
        width: "80%",
        backgroundColor: "#fff",
        color: "black",
        border: "1px solid",
        boxShadow: "none",
        padding: "10px 0",
        fontWeight: "normal",
        "&:hover": {
            backgroundColor: "rgba(66, 133, 244, 0.1)",
        },
    },
};

// サインアップ処理関数
const signUpUser = async (
    name: string,
    email: string,
    password: string,
    router: ReturnType<typeof useRouter>,
) => {
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

const SignUpPage = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    return (
        <Stack flexDirection="column" alignItems="center" spacing={3} sx={styles.container}>
            {/* タイトル */}
            <Typography variant="h5" component="h2">
                Sign Up
            </Typography>

            {/* 入力フィールド */}
            <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="small"
                label="Name"
                sx={styles.input}
            />
            <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                label="Email"
                sx={styles.input}
            />
            <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small"
                label="Password"
                type="password"
                sx={styles.input}
            />

            {/* サインアップボタン */}
            <Button
                label="Sign Up"
                variant="contained"
                onClick={() => signUpUser(name, email, password, router)}
                sx={styles.input}
            />

            <Divider>
                <Typography sx={{ color: "text.secondary" }}>or</Typography>
            </Divider>

            {/* Google サインアップボタン */}
            <Button
                label="Sign Up With Google"
                variant="contained"
                startIcon={
                    <Image src="/google-logo.png" alt="Google Logo" width={20} height={20} />
                } // Googleロゴ画像を挿入
                sx={styles.googleButton}
            />
        </Stack>
    );
};

export default SignUpPage;
