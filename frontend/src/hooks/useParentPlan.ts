import cuid from "cuid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ParentPlan } from "@/types/type";

export const useParentPlan = (parentPlan: ParentPlan) => {
    const [plan, setPlan] = useState<ParentPlan>(parentPlan ?? "");
    const router = useRouter();

    const handleChange = async (parentPlanId: string, key: keyof ParentPlan, value: string) => {
        const updatedPlan = { ...parentPlan, [key]: value };
        const { createdAt, updatedAt, ...targetPlan } = updatedPlan;

        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(targetPlan),
        })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error("Failed to save child plan");
                return;
            });

        setPlan(updatedPlan);
    };

    const handleDelete = async (parentPlanId: string) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/${parentPlanId}/delete`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            },
        );

        if (response.ok) {
            router.push("/plans");
        } else {
            console.error("削除に失敗しました");
        }
        // 課題：一覧ページで削除する場合は、useStateで管理しているplansから除外してあげる必要がある。
    };

    const handleDuplicate = async (parentPlanId: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/duplicate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({parentPlanId}),
        });

        if (response.ok) {
            router.push("/plans");
        } else {
            console.error("Failed to duplicate plan");
        }

        // 課題：一覧ページで複製する場合は、再レンダリングするように処理を追加するだけで勝手に更新されるはず？
    };

    return { plan, setPlan, handleChange, handleDelete, handleDuplicate };
};
