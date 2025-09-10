"use client";
import { Box, Stack, TextField } from "@mui/material";
import cuid from "cuid";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import CountUpIconButton from "@/components/elements/IconButton/CountUpIconButton";
import Button from "@/components/elements/Button/Button"; // Replace Material UI Button
import type { ChildPlanType } from "@/types/type";

type ChildPlanProps = {
    childPlans?: ChildPlanType[];
    setChildPlans: React.Dispatch<React.SetStateAction<ChildPlanType[]>>;
    parentPlanId?: string;
    autoSave?: boolean;
};

const ChildPlan = ({ parentPlanId, childPlans, setChildPlans, autoSave }: ChildPlanProps) => {
    const token = localStorage.getItem("access_token");

    const handleCountUp = async () => {
        if (!childPlans) return;
        const tempId = cuid();
        const newTempPlan = {
            childPlanId: tempId,
            parentPlanId: parentPlanId ?? "",
            order: childPlans.length + 1,
            locationName: "",
            checkInTime: null,
            checkOutTime: null,
            memo: "",
            userId: "default-user-id", // Provide a default value if userId is missing
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
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(planDataForAPI),
                },
            );

            if (!response.ok) {
                console.error("Failed to create child plan");
                return;
            }

            const responseData = await response.json();
            const { newChildPlan } = responseData;

            setChildPlans((prev) =>
                prev.map((plan) => (plan.childPlanId === tempId ? newChildPlan : plan)),
            );
        } catch (error) {
            console.error("Error during child plan creation:", error);
        }
    };

    const handleChange = async (childPlanId: string, key: keyof ChildPlanType, value: string) => {
        setChildPlans((prev) => {
            const updatedPlans = prev.map((plan) =>
                plan.childPlanId === childPlanId ? { ...plan, [key]: value } : plan,
            );
            return updatedPlans;
        });

        if (autoSave) {
            const tempPlan = childPlans?.find((plan) => plan.childPlanId === childPlanId);
            if (!tempPlan) {
                console.error("Target plan not found");
                return;
            }

            const { createdAt, updatedAt, ...targetPlan } = tempPlan;

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/update`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ ...targetPlan, [key]: value }),
                    },
                );

                if (!response.ok) {
                    console.error("Failed to update child plan");
                }
            } catch (error) {
                console.error("Error during child plan update:", error);
            }
        }
    };

    const handleDelete = async (childPlanId: string) => {
        if (!setChildPlans) return;

        if (!autoSave) {
            setChildPlans((prev) => prev.filter((plan) => plan.childPlanId !== childPlanId));
            return;
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/${childPlanId}`,
            {
                method: "Delete",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            },
        );

        const { remainingChildPlans } = await response.json();
        setChildPlans(remainingChildPlans);
    };

    const handleDuplicate = async (childPlanId: string) => {
        if (!childPlans || !setChildPlans) return;

        const targetPlan = childPlans.find((plan) => plan.childPlanId === childPlanId);

        if (!targetPlan) {
            return childPlans;
        }

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
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/child-plans/${targetPlan.childPlanId}/duplicate`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            },
        );

        if (!response.ok) {
            console.error("Failed to duplicate child plan");
            return childPlans;
        }

        const { newChildPlan } = await response.json();

        const updatedPlans = [
            ...childPlans.slice(0, targetPlan.order),
            newChildPlan,
            ...childPlans.slice(targetPlan.order),
        ];

        setChildPlans(updatedPlans);

        return updatedPlans;
    };

    return (
        <Box>
            {childPlans &&
                childPlans.map((plan) => {
                    if (!plan) return null;
                    return (
                        <Stack key={plan.childPlanId} spacing={2} sx={{ mb: 10 }}>
                            <TextField
                                label="目的地"
                                defaultValue={plan.locationName}
                                onBlur={(e) =>
                                    handleChange(plan.childPlanId, "locationName", e.target.value)
                                }
                            />

                            <DateTimePickerGroups
                                startDateTime={plan.checkInTime}
                                endDateTime={plan.checkOutTime}
                                onStartDateTimeChange={(value) =>
                                    handleChange(plan.childPlanId, "checkInTime", value ?? "")
                                }
                                onEndDateTimeChange={(value) =>
                                    handleChange(plan.childPlanId, "checkOutTime", value ?? "")
                                }
                            />
                            <TextField
                                label="メモ"
                                defaultValue={plan.memo}
                                onBlur={(e) => {
                                    handleChange(plan.childPlanId, "memo", e.target.value);
                                }}
                            />
                            <Stack direction="row" spacing={2}>
                                <Button
                                    label="複製"
                                    variant="contained"
                                    sx={{ backgroundColor: "#2196F3" }}
                                    onClick={() => handleDuplicate(plan.childPlanId)}
                                />
                                <Button
                                    label="削除"
                                    variant="contained"
                                    sx={{ backgroundColor: "#F44336" }}
                                    onClick={() => handleDelete(plan.childPlanId)}
                                />
                            </Stack>
                        </Stack>
                    );
                })}

            <CountUpIconButton handleCountUp={handleCountUp} />
        </Box>
    );
};

export default ChildPlan;
