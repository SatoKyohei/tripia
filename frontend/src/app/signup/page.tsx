import { Button, Divider, Stack, TextField, Typography } from "@mui/material";

// 課題：Googleアイコンがない
// 課題：<Button></Button>要素で囲むと大文字になる
// 課題：Googleで新規登録した場合、ユーザー名はどう入力させるか
// 課題：レイアウト、レスポンシブ
// 課題：<Divider>が効かない

const SignUpPage = () => {
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
            <TextField size="small" label="ユーザー名" sx={{ width: "80%" }} />
            <TextField size="small" label="Email" sx={{ width: "80%" }} />
            <TextField size="small" label="Password" type="password" sx={{ width: "80%" }} />
            <Button variant="contained" sx={{ width: "80%" }}>
                Sign Up
            </Button>
            <Divider>
                <Typography sx={{ color: "text.secondary" }}>or</Typography>
            </Divider>
            <Button
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
            >
                Sign Up With Google
            </Button>
        </Stack>
    );
};

export default SignUpPage;
