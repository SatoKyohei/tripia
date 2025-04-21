"use client";
import { Box, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import CountUpIconButton from "@/components/elements/IconButton/CountUpIconButton";
import ChildPlanButtonGroups from "@/components/elements/Button/ChildPlanButtonGroups";
import type { ChildPlan } from "@/types/type";
import { useChildPlans } from "@/hooks/useChildPlans";

type ChildPlanProps = {
    childPlans?: ChildPlan[] | null;
    parentPlanId?: string;
};

const ChildPlan = ({ parentPlanId, childPlans }: ChildPlanProps) => {
    const { plans, setPlans, handleCountUp, handleChange, handleDelete, handleDuplicate } =
        useChildPlans({ childPlans, parentPlanId });

    useEffect(() => {
        if (childPlans) {
            setPlans([...childPlans].sort((a, b) => a.order - b.order));
        }
    }, [childPlans]);

    return (
        <Box>
            {plans &&
                plans.map((plan) => (
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
                        <ChildPlanButtonGroups
                            onDuplicate={() => handleDuplicate(plan.childPlanId)}
                            onDelete={() => handleDelete(plan.childPlanId)}
                        />
                    </Stack>
                ))}

            <CountUpIconButton handleCountUp={handleCountUp} />
        </Box>
    );
};

export default ChildPlan;
