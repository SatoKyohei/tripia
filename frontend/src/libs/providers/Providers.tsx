"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactNode } from "react";

// LocalizationProviderはクライアントサイドでしか動かない

const Providers = ({ children }: { children: ReactNode }) => {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>;
};

export default Providers;
