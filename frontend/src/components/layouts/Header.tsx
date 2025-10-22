"use client";
import {
    AppBar,
    Avatar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Logo from "@/components/elements/Logo/Logo";
import { useAuth } from "@/libs/providers/AuthProvider";
import Button from "@/components/elements/Button/Button"; 
import { HeaderMenu, pagesForGuest, pagesForLoggedIn, settingsBase } from "@/data/navigation";

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const router = useRouter();

    // ログイン状態の保持
    const { isLoggedIn } = useAuth();

    // ログイン状態に応じた各ナビゲーションメニュー設定
    const pages: HeaderMenu[] = isLoggedIn ? pagesForLoggedIn : pagesForGuest;

    // ユーザーメニュー設定（ログアウト処理を含む）
    const settings: HeaderMenu[] = settingsBase.map((setting) =>
        setting.name === "Logout"
            ? {
                  ...setting,
                  onClick: () => {
                      localStorage.removeItem("access_token");
                      window.dispatchEvent(new Event("tripia:auth-changed"));
                      router.replace("/");
                  },
              }
            : setting,
    );

    // ナビゲーションメニュークリック時の処理
    const handleNavClick = (page: HeaderMenu) => {
        setAnchorElNav(null);
        if (page.onClick) {
            page.onClick();
        } else {
            router.push(page.path);
        }
    };

    // ユーザーメニュークリック時の処理
    const handleUserClick = (setting: HeaderMenu) => {
        setAnchorElUser(null);
        if (setting.onClick) {
            setting.onClick();
        } else {
            router.push(setting.path);
        }
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: "#1976d2",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    zIndex: 1200,
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ minHeight: "64px" }}>
                        {/* 左側ロゴ */}
                        <Logo
                            variant="h6"
                            logoSx={{
                                mr: 2,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".2rem",
                                color: "inherit",
                                textDecoration: "none",
                                display: { xs: "none", md: "flex" },
                            }}
                            iconSx={{ mr: 1, display: { xs: "none", md: "flex" } }}
                            name="LOGO"
                        />

                        {/* スマホ用ハンバーガーメニュー */}
                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                color="inherit"
                                onClick={(e) => setAnchorElNav(e.currentTarget)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElNav}
                                open={Boolean(anchorElNav)}
                                onClose={() => setAnchorElNav(null)}
                                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                transformOrigin={{ vertical: "top", horizontal: "left" }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={() => handleNavClick(page)}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* モバイル用ロゴ */}
                        <Logo
                            variant="h5"
                            logoSx={{
                                mr: 2,
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".2rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                            iconSx={{ mr: 1, display: { xs: "flex", md: "none" } }}
                            name="LOGO"
                        />

                        {/* PC用メニュー */}
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}>
                            {pages.map((page) => (
                                <Button
                                    label={page.name}
                                    key={page.name}
                                    href={page.path}
                                    sx={{
                                        color: "white",
                                        fontWeight: "bold",
                                        "&:hover": {
                                            backgroundColor: "rgba(255,255,255,0.2)",
                                        },
                                    }}
                                />
                            ))}
                        </Box>

                        {/* ユーザーアイコン */}
                        {isLoggedIn && (
                            <Box sx={{ ml: 2 }}>
                                <Tooltip title="アカウント設定">
                                    <IconButton
                                        onClick={(e) => setAnchorElUser(e.currentTarget)}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar alt="profile" src="/profile.png" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    anchorEl={anchorElUser}
                                    open={Boolean(anchorElUser)}
                                    onClose={(e) => setAnchorElUser(null)}
                                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting.name}
                                            onClick={() => handleUserClick(setting)}
                                        >
                                            {setting.name}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ height: "64px" }} />
        </>
    );
};

export default Header;
