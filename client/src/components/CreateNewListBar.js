import { Box, Button, Grid, Typography } from "@mui/material";
import { Fragment, useContext } from "react";
import AuthContext from "../auth";
import GlobalStoreContext from "../store";
import PlaylistStoreContext from "../store/PlaylistStore";

export default function CreateNewListBar(props) {
    const { store } = useContext(PlaylistStoreContext)

    const { auth } = useContext(AuthContext);

    const handleCreateNewList = (event) => {
        event.stopPropagation();
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

    let retVal = (
        <Grid item xs={12} container justifyContent={"center"}>
            <Typography>
                { bottomMessage }
            </Typography>
        </Grid>
    )

    if(auth.loggedIn && store.searchMode === "OWN_LISTS") {
        retVal = (
            <Fragment>
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
            </Fragment>
        )
    }

    return (
        <Grid container flexDirection={"row"} alignItems={"center"}>
            {
                retVal
            }
        </Grid>
    )
}