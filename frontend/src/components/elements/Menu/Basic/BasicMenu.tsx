import { Menu, MenuItem, Typography } from "@mui/material";

// 課題：リンクに下線が入っている
// 課題：型定義をtypesディレクトリに移動

type Page = {
    name: string;
    path: string;
};

type Origin = {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
};

type BasicMenuProps = {
    anchorEl: null | HTMLElement;
    anchorOrigin: Origin;
    id: string;
    transformOrigin: Origin;
    open: boolean;
    onClose: () => void;
    onClick: () => void;
    menuSx?: object;
    pageNameSx?: object;
    pages: Page[];
};

const BasicMenu = ({
    anchorEl,
    anchorOrigin,
    id,
    transformOrigin,
    open,
    onClose,
    onClick,
    menuSx,
    pages,
    pageNameSx,
}: BasicMenuProps) => {
    return (
        <Menu
            id={id}
            anchorEl={anchorEl}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            open={open}
            onClose={onClose}
            sx={menuSx}
        >
            {pages.map((page) => (
                <MenuItem key={page.name} onClick={onClick}>
                    <Typography href={`${page.path}`} component="a" sx={pageNameSx}>
                        {page.name}
                    </Typography>
                </MenuItem>
            ))}
        </Menu>
    );
};

export default BasicMenu;
