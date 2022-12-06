import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import GlobalStoreContext from "../store";
import PlaylistStoreContext from "../store/PlaylistStore";

export default function CreateNewListBar(props) {
    const { store } = useContext(PlaylistStoreContext)

    const handleCreateNewList = () => {
        store.createPlaylist();
    }

    let bottomMessage = "Viewing your own lists"

    if(store.searchMode === "BY_USER") {
        if(store.searchValue === "") {
            bottomMessage = "Enter a search term to search by username"
        } else {
            bottomMessage = "Viewing playlists by users with " + store.searchValue + " in their name"
        }
    } else if(store.searchMode === "BY_NAME") {
        if(store.searchValue === "") {
            bottomMessage = "Enter a search term to search by playlist name"
        } else {
            bottomMessage = "Viewing playlists with " + store.searchValue + " in their title"
        }
    }

    return (
        <Grid container flexDirection={"row"} alignItems={"center"}>
            <Grid item xs={6} container justifyContent={"flex-end"}>
                <Button onClick={handleCreateNewList}>
                    Add List
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    { bottomMessage }
                </Typography>
            </Grid>
        </Grid>
        
    )
}