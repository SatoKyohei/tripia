"use client";
import {
    AppBar,
    Avatar,
    Box,
    Button,
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
import { useEffect, useState } from "react";
import BasicIconButton from "@/components/elements/IconButton/Basic/BasicIconButton";
import BasicMenu from "@/components/elements/Menu/Basic/BasicMenu";
import Logo from "@/components/elements/Logo/Logo";
import { useAuth } from "@/libs/providers/AuthProvider";

// 課題：画面上部固定になってないかも

type HeaderMenuType = {
    name: string;
    path: string;
    onClick?: () => void;
};

const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const { isLoggedIn } = useAuth();

    if (!mounted) {
        return null; // 初回SSRでは何も描画しない
    }

    const pages: HeaderMenuType[] = isLoggedIn
        ? [
              { name: "My Plans", path: "/plans" },
              { name: "プランを作成", path: "/plans/create" },
              { name: "人気の旅行先", path: "#" },
              { name: "使い方", path: "#" },
              { name: "お知らせ", path: "#" },
          ]
        : [
              { name: "ログイン", path: "/signin" },
              { name: "人気の旅行先", path: "#" },
              { name: "使い方", path: "#" },
          ];

    const settings: HeaderMenuType[] = [
        { name: "Dashboard", path: "/dashboard" },
        {
            name: "Logout",
            path: "/",
            onClick: () => {
                localStorage.removeItem("access_token");
                window.dispatchEvent(new Event("tripia:auth-changed"));
                router.replace("/");
            },
        },
    ];

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
                            component="a"
                            href="/"
                            noWrap
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
                        />

                        {/* スマホ用ハンバーガーメニュー */}
                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElNav}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                transformOrigin={{ vertical: "top", horizontal: "left" }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page.name}
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            if (page.onClick) page.onClick();
                                            else window.location.href = page.path;
                                        }}
                                    >
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* モバイル用ロゴ */}
                        <Logo
                            variant="h5"
                            component="a"
                            href="/"
                            noWrap
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
                        />

                        {/* PC用メニュー */}
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    href={page.path}
                                    sx={{
                                        color: "white",
                                        fontWeight: "bold",
                                        "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        {/* ユーザーアイコン */}
                        {isLoggedIn && (
                            <Box sx={{ ml: 2 }}>
                                <Tooltip title="アカウント設定">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="profile" src="/profile.png" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    anchorEl={anchorElUser}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting.name}
                                            onClick={() => {
                                                handleCloseUserMenu();
                                                if (setting.onClick) setting.onClick();
                                                else window.location.href = setting.path;
                                            }}
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

//     <Container maxWidth="xl">
//         <Toolbar disableGutters>
//             {/* 課題：component="a" だとリロードになってしまうかも？ */}
//             <Logo
//                 variant="h6"
//                 noWrap
//                 component="a"
//                 href="/"
//                 logoSx={{
//                     mr: 2,
//                     display: { xs: "none", md: "flex" },
//                     fontFamily: "monospace",
//                     fontWeight: 700,
//                     letterSpacing: ".3rem",
//                     color: "inherit",
//                     textDecoration: "none",
//                 }}
//                 iconSx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
//             />
//             <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//                 <BasicIconButton size="large" onClick={handleOpenNavMenu} color="inherit">
//                     <MenuIcon />
//                 </BasicIconButton>

//                 <BasicMenu
//                     id="menu-appbar"
//                     anchorEl={anchorElNav}
//                     anchorOrigin={{
//                         vertical: "bottom",
//                         horizontal: "left",
//                     }}
//                     transformOrigin={{ vertical: "top", horizontal: "left" }}
//                     open={Boolean(anchorElNav)}
//                     onClose={handleCloseNavMenu}
//                     pages={pages}
//                     menuSx={{ display: { xs: "block", md: "none" } }}
//                     onClick={handleCloseNavMenu}
//                     pageNameSx={{ textAlign: "center", textDecoration: "none" }}
//                 />
//             </Box>
//             {/* 課題：component="a" だとリロードになってしまう気が。。 */}
//             <Logo
//                 variant="h5"
//                 noWrap
//                 component="a"
//                 href="/"
//                 logoSx={{
//                     mr: 2,
//                     display: { xs: "flex", md: "none" },
//                     flexGrow: 1,
//                     fontFamily: "monospace",
//                     fontWeight: 700,
//                     letterSpacing: ".3rem",
//                     color: "inherit",
//                     textDecoration: "none",
//                 }}
//                 iconSx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
//             />
//             <Box sx={{ ml: "auto", display: { xs: "none", md: "flex" } }}>
//                 {pages.map((page) => (
//                     <Button
//                         key={page.name}
//                         href={`${page.path}`}
//                         // onClick={handleCloseNavMenu} 課題：なぜhandleclose？ページ遷移の方が良いのでは？
//                         sx={{ my: 2, color: "white", display: "block" }}
//                     >
//                         {page.name}
//                     </Button>
//                 ))}
//                 {isLoggedIn && (
//                     <>
//                         <Tooltip title="open settings">
//                             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                                 <Avatar alt="profile" src="/profile.png" />
//                             </IconButton>
//                         </Tooltip>
//                         <BasicMenu
//                             id="menu-appbar"
//                             anchorEl={anchorElUser}
//                             anchorOrigin={{
//                                 vertical: "bottom",
//                                 horizontal: "right",
//                             }}
//                             transformOrigin={{ vertical: "top", horizontal: "right" }}
//                             open={Boolean(anchorElUser)}
//                             onClose={handleCloseUserMenu}
//                             pages={settings}
//                             menuSx={{ mt: "45px" }}
//                             onClick={handleCloseUserMenu}
//                             pageNameSx={{ textAlign: "center", textDecoration: "none" }}
//                         />
//                     </>
//                 )}
//             </Box>
//         </Toolbar>
//     </Container>
// </AppBar>
