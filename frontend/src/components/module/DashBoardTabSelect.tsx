import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

type DashBoardTabSelectProps = {
    selectedTab: number;
    handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
};

const DashBoardTabSelect = ({ selectedTab, handleTabChange }: DashBoardTabSelectProps) => {
    return (
        <Box
            sx={{
                width: "100%",
                borderBottom: "1px solid #ddd",
                overflowX: "auto",
                whiteSpace: "nowrap",
            }}
        >
            <Tabs
                orientation="horizontal"
                value={selectedTab}
                onChange={handleTabChange}
                sx={{
                    width: "100%",
                    minWidth: 600,
                }}
            >
                <Tab label="ユーザー情報" sx={{ minWidth: 150 }} />
                <Tab label="アクティビティ" sx={{ minWidth: 150 }} />
                <Tab label="アカウント操作" sx={{ minWidth: 150 }} />
            </Tabs>
        </Box>
    );
};

export default DashBoardTabSelect;
