import { Stack, TextField } from "@mui/material";
import Button from "@/components/elements/Button/Button";
import DateTimePickerGroups from "@/components/elements/DateTimePicker/DateTimePickerGroups";
import { ChildPlanType } from "@/types/type";

type ChildPlanItemProps = {
    plan: ChildPlanType;
    handleChange: (childPlanId: string, field: keyof ChildPlanType, value: string) => void;
    handleDelete: (childPlanId: string) => void;
    handleDuplicate: (childPlanId: string) => void;
};

const ChildPlanItem = (props: ChildPlanItemProps) => {
    return (
        <div>
            <Stack key={props.plan.childPlanId} spacing={2} sx={{ mb: 10 }}>
                <TextField
                    label="目的地"
                    defaultValue={props.plan.locationName}
                    onBlur={(e) =>
                        props.handleChange(props.plan.childPlanId, "locationName", e.target.value)
                    }
                />

                <DateTimePickerGroups
                    startDateTime={props.plan.checkInTime}
                    endDateTime={props.plan.checkOutTime}
                    onStartDateTimeChange={(value) =>
                        props.handleChange(props.plan.childPlanId, "checkInTime", value ?? "")
                    }
                    onEndDateTimeChange={(value) =>
                        props.handleChange(props.plan.childPlanId, "checkOutTime", value ?? "")
                    }
                />
                <TextField
                    label="メモ"
                    defaultValue={props.plan.memo}
                    onBlur={(e) => {
                        props.handleChange(props.plan.childPlanId, "memo", e.target.value);
                    }}
                />
                <Stack direction="row" spacing={2}>
                    <Button
                        label="複製"
                        variant="contained"
                        sx={{ backgroundColor: "#2196F3" }}
                        onClick={() => props.handleDuplicate(props.plan.childPlanId)}
                    />
                    <Button
                        label="削除"
                        variant="contained"
                        sx={{ backgroundColor: "#F44336" }}
                        onClick={() => props.handleDelete(props.plan.childPlanId)}
                    />
                </Stack>
            </Stack>
        </div>
    );
};

export default ChildPlanItem;
