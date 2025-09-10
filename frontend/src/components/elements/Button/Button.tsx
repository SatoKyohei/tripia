import React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export interface ButtonProps extends MuiButtonProps {
    label: string;
}

const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
    return <MuiButton {...props}>{label}</MuiButton>;
};

export default Button;
