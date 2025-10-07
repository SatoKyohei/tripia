"use client";
import { Box } from "@mui/material";
import cuid from "cuid";
import CountUpIconButton from "@/components/elements/IconButton/CountUpIconButton";
import type { ChildPlanType } from "@/types/type";
import {
    createChildPlan,
    deleteChildPlan,
    duplicateChildPlan,
    updateChildPlan,
} from "@/services/childPlanApi";
import ChildPlanItem from "@/components/module/childPlanItem";

type ChildPlanProps = {
    childPlans?: ChildPlanType[];
    setChildPlans: React.Dispatch<React.SetStateAction<ChildPlanType[]>>;
    parentPlanId?: string;
    autoSave?: boolean;
};

const ChildPlanSection = ({
    parentPlanId,
    childPlans,
    setChildPlans,
    autoSave,
}: ChildPlanProps) => {
    const token = localStorage.getItem("access_token");

    // 子プラン追加処理
    const handleCountUp = async () => {
        if (!childPlans) return;
        const tempId = cuid();
        const newTempPlan: Omit<ChildPlanType, "createdAt" | "updatedAt"> = {
            childPlanId: tempId,
            parentPlanId: parentPlanId ?? "",
            order: childPlans.length + 1,
            locationName: "",
            checkInTime: null,
            checkOutTime: null,
            memo: "",
            userId: "default-user-id",
        };

        setChildPlans((prev) => [
            ...prev,
            {
                ...newTempPlan,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ]);

        if (!parentPlanId) {
            return;
        }

        const { childPlanId, ...planDataForAPI } = newTempPlan;

        try {
            const { newChildPlan } = await createChildPlan(planDataForAPI, token ?? "");

            setChildPlans((prev) =>
                prev.map((plan) => (plan.childPlanId === tempId ? newChildPlan : plan)),
            );
        } catch (error) {
            console.error("Error during child plan creation:", error);
        }
    };

    // 子プラン編集処理
    const handleChange = async (childPlanId: string, key: keyof ChildPlanType, value: string) => {
        // 状態の更新のみ
        setChildPlans((prev) => {
            const updatedPlans = prev.map((plan) =>
                plan.childPlanId === childPlanId ? { ...plan, [key]: value } : plan,
            );
            return updatedPlans;
        });

        // 編集ページ用: AutoSave機能の実装
        if (autoSave) {
            const tempPlan = childPlans?.find((plan) => plan.childPlanId === childPlanId);
            if (!tempPlan) {
                console.error("Target plan not found");
                return;
            }

            const { createdAt, updatedAt, ...targetPlan } = tempPlan;

            try {
                await updateChildPlan(targetPlan, key, value, token ?? "");
            } catch (error) {
                console.error("Error during child plan update:", error);
            }
        }
    };

    // 子プラン削除処理
    const handleDelete = async (childPlanId: string) => {
        if (!setChildPlans) return;

        if (!autoSave) {
            setChildPlans((prev) => prev.filter((plan) => plan.childPlanId !== childPlanId));
            return;
        }

        const { remainingChildPlans } = await deleteChildPlan(childPlanId, token ?? "");
        setChildPlans(remainingChildPlans);
    };

    // 子プラン複製処理
    const handleDuplicate = async (childPlanId: string) => {
        if (!childPlans || !setChildPlans) return;

        const targetPlan = childPlans.find((plan) => plan.childPlanId === childPlanId);

        if (!targetPlan) {
            return childPlans;
        }

        // 作成ページ用：状態としてのみ保持
        if (!autoSave) {
            const newChildPlan = {
                ...targetPlan,
                childPlanId: cuid(),
                order: targetPlan.order + 0.1,
            };

            const updatedPlans = [...childPlans, newChildPlan]
                .sort((a, b) => a.order - b.order)
                .map((plan, index) => ({ ...plan, order: index + 1 }));

            setChildPlans(updatedPlans);
            return;
        } else {
            // 編集ページ用：AutoSave機能の実装
            const { newChildPlan } = await duplicateChildPlan(childPlanId, token ?? "");

            const updatedPlans = [
                ...childPlans.slice(0, targetPlan.order),
                newChildPlan,
                ...childPlans.slice(targetPlan.order),
            ];

            setChildPlans(updatedPlans);

            return updatedPlans;
        }
    };

    return (
        <Box>
            {childPlans &&
                childPlans.map((plan) => {
                    if (!plan) return null;
                    return (
                        <ChildPlanItem
                            key={plan.childPlanId}
                            plan={plan}
                            handleChange={handleChange}
                            handleDelete={handleDelete}
                            handleDuplicate={handleDuplicate}
                        />
                    );
                })}

            <CountUpIconButton handleCountUp={handleCountUp} />
        </Box>
    );
};

export default ChildPlanSection;
