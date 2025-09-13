import React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export interface ButtonProps extends MuiButtonProps {
    label?: string;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ label, children, ...props }) => {
    return <MuiButton {...props}>{label ?? children}</MuiButton>;
};

export default Button;
