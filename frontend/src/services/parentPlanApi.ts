// バックエンドAPI（parentPlan）へのリクエストをまとめたファイル
import { ParentPlanType } from "@/types/type";

// リクエストヘッダーを生成する関数
// 引数: token（認証トークン）
const headers = (token: string) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
});

// 全ての親プランを取得する関数
// 引数: token（認証トークン）
// 戻り値: 親プランのリスト
export const fetchAllParentPlan = async (token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/`, {
            method: "GET",
            headers: headers(token),
        });
        if (!response.ok) throw new Error("プラン一覧取得に失敗しました");

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("プラン一覧取得失敗:", error);
    }
};

// 特定の親プランを取得する関数
// 引数: parentPlanId（親プランのID）、token（認証トークン）
// 戻り値: 親プランのデータ
export const fetchParentPlan = async (parentPlanId: string, token: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/${parentPlanId}`,
            {
                method: "GET",
                headers: headers(token),
            },
        );
        if (!response.ok) throw new Error("プラン取得に失敗しました");

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("プラン取得失敗:", error);
    }
};

// 親プランを作成する関数
// 引数: plan（作成する親プランのデータ）、token（認証トークン）
// 戻り値: 作成した親プランのID
export const createParentPlan = async (plan: ParentPlanType, token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/create`, {
            method: "POST",
            headers: headers(token),
            body: JSON.stringify(plan),
        });
        if (!response.ok) throw new Error("作成に失敗しました");

        const responseData = await response.json();
        return responseData.parentPlanId;
    } catch (error) {
        console.error("親プラン作成失敗:", error);
    }
};

// 親プランを更新する関数
// 引数: plan（更新する親プランのデータ）、token（認証トークン）
// 戻り値: なし
export const updateParentPlan = async (plan: ParentPlanType, token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/update`, {
            method: "PUT",
            headers: headers(token),
            body: JSON.stringify(plan),
        });
        if (!response.ok) throw new Error("更新に失敗しました");

        return response;
    } catch (error) {
        console.error("親プラン更新失敗:", error);
    }
};

// 親プランを削除する関数
// 引数: parentPlanId（削除する親プランのID）、token（認証トークン）
// 戻り値: なし
export const deleteParentPlan = async (parentPlanId: string, token: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/${parentPlanId}/delete`,
            {
                method: "DELETE",
                headers: headers(token),
            },
        );
        if (!response.ok) throw new Error("削除に失敗しました");

        return response;
    } catch (error) {
        console.error("親プラン削除失敗:", error);
    }
};

// 親プランを複製する関数
// 引数: parentPlanId（複製する親プランのID）、token（認証トークン）
// 戻り値: なし
export const duplicateParentPlan = async (parentPlanId: string, token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/duplicate`, {
            method: "POST",
            headers: headers(token),
            body: JSON.stringify({ parentPlanId }),
        });
        if (!response.ok) throw new Error("削除に失敗しました");

        return response;
    } catch (error) {
        console.error("親プラン複製失敗:", error);
    }
};
