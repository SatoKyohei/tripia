"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactNode } from "react";
import { AuthProvider } from "@/libs/providers/AuthProvider";

// LocalizationProviderはクライアントサイドでしか動かない

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AuthProvider>{children}</AuthProvider>
        </LocalizationProvider>
    );
};

export default Providers;
