import cuid from "cuid";
import { useState } from "react";
import { ChildPlan } from "@/types/type";

type ChildPlanProps = {
    childPlans?: ChildPlan[] | null;
    parentPlanId?: string;
};

export const useChildPlans = ({ parentPlanId, childPlans }: ChildPlanProps) => {
    const [plans, setPlans] = useState<ChildPlan[]>(childPlans ?? []);

    const handleCountUp = async () => {
        const tempId = cuid();
        const newTempPlan = {
            childPlanId: tempId,
            parentPlanId: parentPlanId ?? "",
            order: plans.length + 1,
            locationName: "",
            checkInTime: null,
            checkOutTime: null,
            memo: "",
        };

        setPlans((prev) => [...prev, newTempPlan]);
        const { childPlanId, ...planDataForAPI } = newTempPlan;

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(planDataForAPI),
            credentials: "include",
        });

        const responseData = await response.json();
        const { newChildPlan } = responseData;

        setPlans((prev) => prev.map((plan) => (plan.childPlanId === tempId ? newChildPlan : plan)));
    };

    const handleChange = async (childPlanId: string, key: keyof ChildPlan, value: string) => {
        setPlans((prev) => {
            const updatedPlans = prev.map((plan) =>
                plan.childPlanId === childPlanId ? { ...plan, [key]: value } : plan,
            );

            const tempPlan = updatedPlans.find((plan) => plan.childPlanId === childPlanId);
            const { createdAt, updatedAt, ...targetPlan } = tempPlan;

            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(targetPlan),
                credentials: "include",
            }).then((response) => {
                if (!response.ok) {
                    console.error("Failed to save child plan");
                    return;
                }
            });

            return updatedPlans;
        });
    };

    const handleDelete = async (childPlanId: string) => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/${childPlanId}`,
            {
                method: "Delete",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            },
        );

        const { remainingChildPlans } = await response.json();
        setPlans(remainingChildPlans);
    };

    const handleDuplicate = async (childPlanId: string) => {
        const targetPlan = plans.find((plan) => plan.childPlanId === childPlanId);
        if (!targetPlan) {
            return plans;
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/${targetPlan.childPlanId}/duplicate`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            },
        );

        if (!response.ok) {
            console.error("Failed to duplicate child plan");
            return plans;
        }

        const { newChildPlan } = await response.json();

        const updatedPlans = [
            ...plans.slice(0, targetPlan.order),
            newChildPlan,
            ...plans.slice(targetPlan.order),
        ];

        setPlans(updatedPlans);

        return updatedPlans;
    };
    return { plans, setPlans, handleCountUp, handleChange, handleDelete, handleDuplicate };
};
