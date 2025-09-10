import { SxProps, Theme, Typography } from "@mui/material";
import { ElementType } from "react";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";

type LogoProps = {
    variant: React.ComponentProps<typeof Typography>["variant"];
    noWrap?: boolean;
    component?: ElementType;
    href?: string;
    logoSx: SxProps<Theme>;
    iconSx: SxProps<Theme>;
    name: string;
};

const Logo = ({
    variant,
    noWrap = true,
    component = "a",
    href = "/",
    logoSx,
    iconSx,
    name,
}: LogoProps) => {
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
                {name}
            </Typography>
        </>
    );
};

export default Logo;
