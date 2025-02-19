"use client";
import { useTheme, Link } from "@mui/material";
import { AuthProvider, AuthResponse, SignInPage } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/AppProvider";

// 課題：ヘッダーとの間に空間がある

const providers = [
    { id: "google", name: "Google" },
    { id: "credentials", name: "Email and Password" },
];

const signIn = async (provider: AuthProvider): Promise<AuthResponse> => {
    return new Promise<AuthResponse>((resolve) => {
        setTimeout(() => {
            console.log(`Sign in with ${provider.id}`);
            resolve({ error: "This is a mock error message." });
        }, 500);
    });
};

const LoginPage = () => {
    const theme = useTheme();

    const signUpLink = () => {
        return (
            <>
                新規登録は<Link href="/signup">こちら</Link>
            </>
        );
    };

    const forgotPasswordLink = () => {
        return (
            <>
                <Link href="/forgotpassword">パスワードを忘れましたか？</Link>
            </>
        );
    };

    return (
        <AppProvider theme={theme}>
            <SignInPage
                signIn={signIn}
                providers={providers}
                slots={{ signUpLink: signUpLink, forgotPasswordLink: forgotPasswordLink }}
            />
        </AppProvider>
    );
};

export default LoginPage;
