// バックエンドAPI（parentPlan）へのリクエストをまとめたファイル
import { ParentPlan } from "@/types/type";

const headers = (token: string) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
});

export const createParentPlan = async (plan: ParentPlan, token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/create`, {
            method: "POST",
            headers: headers(token),
            body: JSON.stringify(plan),
        });
        if (!response.ok) throw new Error("作成に失敗しました");

        return await response.json();
    } catch (error) {
        console.error("親プラン作成失敗:", error);
    }
};

export const updateParentPlan = async (plan: ParentPlan, token: string) => {
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
