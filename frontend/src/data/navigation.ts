
export type HeaderMenu = {
    name: string;
    path: string;
    onClick?: () => void;
};

export const pagesForLoggedIn: HeaderMenu[] = [
    { name: "My Plans", path: "/plans" },
    { name: "プランを作成", path: "/plans/create" },
    //   { name: "人気の旅行先（準備中）", path: "#" },
    //   { name: "使い方（準備中）", path: "#" },
    //   { name: "お知らせ（準備中）", path: "#" },
];

export const pagesForGuest: HeaderMenu[] = [
    { name: "ログイン", path: "/signin" },
    //   { name: "人気の旅行先（準備中）", path: "#" },
    //   { name: "使い方（準備中）", path: "#" },
];

export const settingsBase: HeaderMenu[] = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Logout", path: "/" },
];
