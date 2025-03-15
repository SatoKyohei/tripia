"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ReactNode } from "react";
import { AreaProvider } from "@/contexts/AreaContext";

// LocalizationProviderはクライアントサイドでしか動かない

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <AreaProvider>{children}</AreaProvider>
        </LocalizationProvider>
    );
};

export default Providers;
