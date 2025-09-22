// バックエンドAPI（childPlan）へのリクエストをまとめたファイル

import { ChildPlanType } from "@/types/type";

const headers = (token: string) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
});

export const createChildPlan = async (
    planData: Omit<ChildPlanType, "childPlanId" | "createdAt" | "updatedAt">,
    token: string,
) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/create`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(planData),
    });

    if (!response.ok) throw new Error("Failed to create child plan");

    return await response.json();
};

export const updateChildPlan = async (
    planData: Omit<ChildPlanType, "createdAt" | "updatedAt">,
    key: keyof ChildPlanType,
    value: string,
    token: string,
) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/update`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify({ ...planData, [key]: value }),
    });

    if (!response.ok) throw new Error("Failed to update child plan");
};

export const deleteChildPlan = async (childPlanId: string, token: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/${childPlanId}`,
        {
            method: "DELETE",
            headers: headers(token),
        },
    );

    if (!response.ok) throw new Error("Failed to delete child plan");
    return await response.json();
};

export const duplicateChildPlan = async (childPlanId: string, token: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/${childPlanId}/duplicate`,
        {
            method: "POST",
            headers: headers(token),
        },
    );

    if (!response.ok) throw new Error("Failed to duplicate child plan");
    return await response.json();
};
