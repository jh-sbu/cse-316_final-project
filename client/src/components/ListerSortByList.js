import { ClearAll } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react"

export default function ListerSortByList(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    const handleMenuClose = (event) => {
        setAnchorEl(null);
    }

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleSelectSort = (event) => {
        console.log("Option " + event + " not yet supported");
        console.log(event);
        setAnchorEl(null);
    }

    const menu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id="search-sort-menu"
            keepMounted
            open={isOpen}
            onClose={handleCloseMenu}
        >
            <MenuItem onClick={handleSelectSort}>
                Name (A - Z)
            </MenuItem>
            <MenuItem>
                Published Date (Newest)
            </MenuItem>
            <MenuItem>
                Listens (High - Low)
            </MenuItem>
            <MenuItem>
                Likes (High - Low)
            </MenuItem>
            <MenuItem>
                Dislikes (High - Low)
            </MenuItem>
        </Menu>
    )

    return (
        <Box>
            <IconButton onClick={handleOpenMenu}>
                SORT BY <ClearAll />
            </IconButton>
            {
                menu
            }
        </Box>
    )
}