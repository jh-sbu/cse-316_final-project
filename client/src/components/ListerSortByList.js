import { ClearAll, Store } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react"
import PlaylistStoreContext from "../store/PlaylistStore";

export default function ListerSortByList(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    const { store } = useContext(PlaylistStoreContext);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleAZSort = (event) => {
        event.preventDefault();
        //console.log("Option " + event + " not yet supported");
        //console.log("Here at least?");
        store.changeSortMethod("NAME_A_Z");
        setAnchorEl(null);
    }

    const handlePublishSort = (event) => {
        event.preventDefault();
        //console.log("Option " + event + " not yet supported");
        store.changeSortMethod("PUBLISHED_DATE");
        setAnchorEl(null);
    }

    const handleListensSort = (event) => {
        event.preventDefault();
        //console.log("Option " + event + " not yet supported");
        store.changeSortMethod("LISTENS");
        setAnchorEl(null);
    }

    const handleLikesSort = (event) => {
        event.preventDefault();
        //console.log("Option " + event + " not yet supported");
        store.changeSortMethod("LIKES");
        setAnchorEl(null);
    }

    const handleDislikesSort = (event) => {
        event.preventDefault();
        //console.log("Option " + event + " not yet supported");
        store.changeSortMethod("DISLIKES");
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
            <MenuItem onClick={handleAZSort}>
                Name (A - Z)
            </MenuItem>
            <MenuItem onClick={handlePublishSort}>
                Published Date (Newest)
            </MenuItem>
            <MenuItem onClick={handleListensSort}>
                Listens (High - Low)
            </MenuItem>
            <MenuItem onClick={handleLikesSort}>
                Likes (High - Low)
            </MenuItem>
            <MenuItem onClick={handleDislikesSort}>
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