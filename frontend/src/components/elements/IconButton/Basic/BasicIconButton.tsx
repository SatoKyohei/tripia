import { IconButton } from "@mui/material";
import { ReactNode } from "react";

type BasicIconButtonProps = {
    children: ReactNode;
    color:
        | "inherit"
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "info"
        | "success"
        | "warning";
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    size: "small" | "medium" | "large";
};

const BasicIconButton = ({ children, color, onClick, size }: BasicIconButtonProps) => {
    return (
        <IconButton color={color} size={size} onClick={onClick}>
            {children}
        </IconButton>
    );
};

export default BasicIconButton;
