"use client";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import DashBoardTabSelect from "@/components/module/DashBoardTabSelect";
import DashBoardUserInfoTab from "@/components/layouts/DashBoardUserInfoTab";
import DashBoardActivityTab from "@/components/layouts/DashBoardActivityTab";
import DashBoardAcountTab from "@/components/layouts/DashBoardAcountTab";

// タブのインデックスを定数として定義
const USER_INFO_TAB = 0;
const ACTIVITY_TAB = 1;
const ACCOUNT_TAB = 2;

const DashboardPage = () => {
    // タブの選択状態を管理
    const [selectedTab, setSelectedTab] = useState(USER_INFO_TAB);
    // ユーザー情報の状態を管理
    const [thumbnail, setThumbnail] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    // コンポーネントの初回レンダリング時にユーザー情報を取得
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) throw new Error("ユーザー取得に失敗しました");

                // ユーザー情報を状態にセット
                setThumbnail(data.profileThumbnail);
                setName(data.name);
                setEmail(data.email);
            } catch (error) {
                console.error(error);
                throw new Error("ユーザー取得に失敗しました");
            }
        };

        fetchData();
    }, []);

    // タブ変更時のハンドラー
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    // 選択されたタブに応じてコンテンツをレンダリング
    const renderTabContent = () => {
        switch (selectedTab) {
            case USER_INFO_TAB:
                return (
                    <DashBoardUserInfoTab
                        thumbnail={thumbnail}
                        name={name}
                        email={email}
                        isEditing={isEditing}
                        setName={setName}
                        setEmail={setEmail}
                        setIsEditing={setIsEditing}
                    />
                );
            case ACTIVITY_TAB:
                return <DashBoardActivityTab />;
            case ACCOUNT_TAB:
                return <DashBoardAcountTab />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* 左ペインのタブセレクター */}
            <DashBoardTabSelect selectedTab={selectedTab} handleTabChange={handleTabChange} />

            {/* 右ペインのコンテンツ */}
            <Box sx={{ flex: 1, p: 4 }}>{renderTabContent()}</Box>
        </Box>
    );
};

export default DashboardPage;
