"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

// 認証コンポーネント
// 子コンポーネントをラップし、認証状態に応じてアクセス制御を行う
const Auth = ({ children }: { children: ReactNode }) => {
    const router = useRouter(); // ルーターオブジェクトを取得
    const pathname = usePathname(); // 現在のパスを取得
    const [loading, setLoading] = useState(true); // ローディング状態を管理

    useEffect(() => {
        // 認証不要なパスのリスト
        const publicPaths = ["/", "/signin", "/signup"];
        const token = localStorage.getItem("access_token"); // ローカルストレージからトークンを取得

        // トークンがない場合、認証不要なパス以外へのアクセスを制限
        if (!token && !publicPaths.includes(pathname)) {
            router.replace("/signin"); // サインインページにリダイレクト
        } else {
            setLoading(false); // ローディング状態を解除
        }
    }, [pathname, router]);

    // ローディング中は何も表示しない
    if (loading) return null;

    // 子コンポーネントをレンダリング
    return children;
};

export default Auth;
