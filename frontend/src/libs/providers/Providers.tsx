"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactNode } from "react";
import { AuthProvider } from "@/libs/providers/AuthProvider";

// LocalizationProviderはクライアントサイドでしか動かない

// アプリケーション全体で使用するプロバイダーをまとめたコンポーネント
// 現在は日付ピッカーのローカライズと認証状態の管理を提供
const Providers = ({ children }: { children: ReactNode }) => {
    return (
        // 日付ピッカーのローカライズを提供
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* 認証状態を管理するプロバイダー */}
            <AuthProvider>{children}</AuthProvider>
        </LocalizationProvider>
    );
};

export default Providers;
