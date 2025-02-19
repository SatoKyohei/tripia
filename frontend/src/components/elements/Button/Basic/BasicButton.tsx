import { Button } from "@mui/material";
import { ReactNode } from "react";

// 課題：レイアウト
// 課題：tabIndexとroleが不明（そのまま使ってる）

type BasicButtonProps = {
    buttonName: string;
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    component?: string;
    href?: string;
    onClick?: () => void;
    startIcon?: ReactNode;
    sx?: object;
    tabIndex?: number;
    variant: "contained" | "outlined" | "text";
};

const BasicButton = ({
    buttonName,
    color,
    component,
    href,
    onClick,
    startIcon,
    sx,
    tabIndex,
    variant,
}: BasicButtonProps) => {
    return (
        <Button
            color={color}
            {...(component ? { component } : {})}
            href={href}
            onClick={onClick}
            startIcon={startIcon}
            sx={sx}
            tabIndex={tabIndex}
            variant={variant}
        >
            {buttonName}
        </Button>
    );
};

export default BasicButton;
