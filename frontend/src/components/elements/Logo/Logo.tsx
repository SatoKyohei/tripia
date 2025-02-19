import { Typography } from "@mui/material";
import { ElementType } from "react";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";

type TypographyProps = {
    variant:
        | "body1"
        | "body2"
        | "button"
        | "caption"
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "inherit"
        | "overline"
        | "subtitle1"
        | "subtitle2";
    noWrap: boolean;
    component: ElementType;
    href: string;
    logoSx: object;
    iconSx: object;
};

const Logo = ({ variant, noWrap, component, href, logoSx, iconSx }: TypographyProps) => {
    return (
        <>
            <LocalAirportIcon sx={iconSx} />
            <Typography
                variant={variant}
                noWrap={noWrap}
                component={component}
                href={href}
                sx={logoSx}
            >
                LOGO
            </Typography>
        </>
    );
};

export default Logo;
