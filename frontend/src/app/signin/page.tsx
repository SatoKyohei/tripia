"use client";
import { useTheme, Link } from "@mui/material";
import { AuthProvider, AuthResponse, SignInPage as ToolpadSignInPage } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useRouter } from "next/navigation";

const providers = [
    { id: "google", name: "Google" },
    { id: "credentials", name: "Email and Password" },
];

const SignInPage = () => {
    const theme = useTheme();
    const router = useRouter();

    // サインイン処理
    const signIn = async (provider: AuthProvider, formdata: FormData): Promise<AuthResponse> => {
        try {
            const email = formdata.get("email");
            const password = formdata.get("password");

            // バックエンドにログインリクエストを送信
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "ログインに失敗しました");
            }

            const data = await response.json();
            localStorage.setItem("access_token", data.token);
            window.dispatchEvent(new Event("tripia:auth-changed"));
            router.replace("/plans");
            return { success: "ログインに成功しました" };
        } catch (error) {
            console.error(error);
            return { error: "ログインに失敗しました" };
        }
    };

    // 新規登録リンク
    const signUpLink = () => <Link href="/signup">新規登録はこちら</Link>;

    // パスワードリセットリンク
    const forgotPasswordLink = () => <Link href="/forgotpassword">パスワードを忘れましたか？</Link>;

    return (
        <AppProvider theme={theme}>
            <ToolpadSignInPage
                signIn={signIn}
                providers={providers}
                slots={{
                    signUpLink,
                    forgotPasswordLink,
                }}
            />
        </AppProvider>
    );
};

export default SignInPage;
