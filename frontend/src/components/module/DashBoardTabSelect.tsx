import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

type DashBoardTabSelectProps = {
    selectedTab: number;
    handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
};

const DashBoardTabSelect = ({ selectedTab, handleTabChange }: DashBoardTabSelectProps) => {
    return (
        <Box sx={{ width: "20%", borderRight: "1px solid #ddd" }}>
            <Tabs
                orientation="vertical"
                value={selectedTab}
                onChange={handleTabChange}
                sx={{ height: "100%" }}
            >
                <Tab label="ユーザー情報" />
                <Tab label="アクティビティ" />
                <Tab label="アカウント操作" />
            </Tabs>
        </Box>
    );
};

export default DashBoardTabSelect;
