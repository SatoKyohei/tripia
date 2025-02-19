"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ReactNode } from "react";

// LocalizationProviderはクライアントサイドでしか動かない

const Providers = ({ children }: { children: ReactNode }) => {
    return <LocalizationProvider dateAdapter={AdapterMoment}>{children}</LocalizationProvider>;
};

export default Providers;
