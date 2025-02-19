import { Button, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";

// 課題：各<Typography>の位置関係が揃ってない
// 課題：変更するを押したら<TextField>になり、変更できるようになる

const ProfilePage = () => {
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
                <TextField variant="standard" size="small" value="testuser" />
            </Typography>
            <Typography variant="body1" component="div">
                Email：
                <TextField variant="standard" size="small" value="test@example.com" />
            </Typography>
            <Typography variant="body1" component="div">
                Password：*****
            </Typography>
            <Button variant="contained">変更する</Button>
        </Stack>
    );
};

export default ProfilePage;
