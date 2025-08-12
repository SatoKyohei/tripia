"use client";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

// 課題：各<Typography>の位置関係が揃ってない
// 課題：変更するを押したら<TextField>になり、変更できるようになる

const ProfilePage = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mypage`);
                const data = await response.json();
                if (response.ok) {
                    setImage(data.image);
                    setName(data.name);
                    setEmail(data.email);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <Stack
            spacing={2}
            alignItems="center"
            sx={{
                maxWidth: "400px",
                margin: "0 auto",
                padding: "30px 0",
                borderRadius: "4px",
                boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.35)",
                marginTop: 5,
            }}
        >
            <Image src="/profile.png" alt="profile" width={100} height={100} />

            <Typography variant="body1" component="div">
                ユーザー名：
                <TextField variant="standard" size="small" value={name} />
            </Typography>
            <Typography variant="body1" component="div">
                Email：
                <TextField variant="standard" size="small" value={email} />
            </Typography>
            <Typography variant="body1" component="div">
                Password：*****
            </Typography>
            <Button variant="contained">変更する</Button>
        </Stack>
    );
};

export default ProfilePage;
