"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// 認証コンテキストの型を定義
// isLoggedIn: ログイン状態を示すフラグ
// setIsLoggedIn: ログイン状態を更新する関数
type AuthContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
};

// 認証コンテキストを作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 認証プロバイダーコンポーネント
// 子コンポーネントに認証状態を提供
export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 初期読み込み時にログイン状態を設定
        const update = () => setIsLoggedIn(!!localStorage.getItem("access_token"));
        update();

        // カスタムイベントでログイン状態を監視
        window.addEventListener("tripia:auth-changed", update);
        return () => window.removeEventListener("tripia:auth-changed", update);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

// 認証コンテキストを利用するためのカスタムフック
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
