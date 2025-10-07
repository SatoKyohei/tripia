// ヘッダーメニューの型を定義
export type HeaderMenu = {
    name: string; // メニュー名
    path: string; // 遷移先のパス
    onClick?: () => void; // オプションのクリックイベント
};

// ログイン済みユーザー向けのページリスト
export const pagesForLoggedIn: HeaderMenu[] = [
    { name: "My Plans", path: "/plans" },
    { name: "プランを作成", path: "/plans/create" },
    //   { name: "人気の旅行先（準備中）", path: "#" },
    //   { name: "使い方（準備中）", path: "#" },
    //   { name: "お知らせ（準備中）", path: "#" },
];

// 非ログイン・ゲストユーザー向けのページリスト
export const pagesForGuest: HeaderMenu[] = [
    { name: "ログイン", path: "/signin" },
    //   { name: "人気の旅行先（準備中）", path: "#" },
    //   { name: "使い方（準備中）", path: "#" },
];

// ログイン済みユーザー向けの設定メニューリスト
export const settingsBase: HeaderMenu[] = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Logout", path: "/" },
];
