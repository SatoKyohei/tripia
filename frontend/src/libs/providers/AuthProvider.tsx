"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 初期読み込み
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

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
