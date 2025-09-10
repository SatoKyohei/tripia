import { IconButton as MuiIconButton } from "@mui/material";
import { ReactNode } from "react";

type IconButtonProps = {
    children: ReactNode;
    color: React.ComponentProps<typeof MuiIconButton>["color"];
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    size: React.ComponentProps<typeof MuiIconButton>["size"];
};

const IconButton = ({ children, color, onClick, size }: IconButtonProps) => {
    return (
        <MuiIconButton color={color} size={size} onClick={onClick}>
            {children}
        </MuiIconButton>
    );
};

export default IconButton;
