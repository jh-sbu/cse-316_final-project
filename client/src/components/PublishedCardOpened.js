import { Delete, ExpandLess, ThumbDown, ThumbUp, UnfoldMore } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Link, ListItem, ListItemButton, Typography } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../auth";
import PlaylistStoreContext from "../store/PlaylistStore";
import PublishedListBottomBar from "./PublishedListBottomBar";
import SongList from "./SongList";

export default function PublishedCardOpen(props) {

    let playlist = props.playlist;

    const { store } = useContext(PlaylistStoreContext);

    const { auth } = useContext(AuthContext);

    //console.log(playlist);

    const handleCloseList = (event) => {
        event.stopPropagation();
        store.setOpenedList(null);
    }

    const handleClickDelete = (event) => {
        event.stopPropagation();

        if(!auth.loggedIn) {
            return;
        }

        store.markListForDeletion(playlist._id)
    }

    const handleClickDuplicate = (event) => {
        event.stopPropagation();
        store.duplicatePlaylist(playlist);
    }

    const handleClickPlaylist = (event) => {
        console.log("Received click on playlist");
        event.stopPropagation();
        //console.log("Playing playlist not implemented yet");
        store.playPlaylist(playlist);
    }

    const handleClickUsername = (event) => {
        event.stopPropagation();
        store.changeSearchAndValue("BY_USER", playlist.ownerUsername)
    }

    const handleClickLike = (event) => {
        event.stopPropagation();
        //console.log("Liking songs not implemented yet");

        store.likeDislike("like", playlist);
    }

    const handleClickDislike = (event) => {
        event.stopPropagation();
        //console.log("Disliking songs not implemented yet");

        store.likeDislike("dislike", playlist);
    }

    let trashCan = ""

    if(auth.loggedIn && auth.user.userName === playlist.ownerUsername) {
        trashCan = (
            <IconButton onClick={handleClickDelete}>
                <Delete />
            </IconButton>
        )
    }

    let bgColor = "#23c87e";
    let bgColorSelected = "#13a85e";

    if(store.playingList && store.playingList._id === playlist._id) {
        bgColor = "#00bcd4"
        bgColorSelected = "#008394"
    }

    return (
        <ListItemButton
            id = {playlist.id}
            key = {playlist.id}
            sx = {{ marginTop: '15px', display: 'flex', p: 1, borderRadius: '30px', bgcolor: bgColor, '&:hover': {bgcolor: bgColorSelected}}}
            style = {{ width: '100%', fontSize: '48pt' }}
            onClick = {handleClickPlaylist}
        >
            <Grid container direction="row">
                <Grid item xs={6} container direction={"column"}>
                    <Typography variant="h5">
                        {
                            playlist.name
                        }
                    </Typography>
                    <Box>
                        <Typography>
                            By:
                            <Button onClick={handleClickUsername}>
                                {playlist.ownerUsername}
                            </Button> 
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} container direction="row" justifyContent={"flex-end"}>
                    <Typography>
                        <IconButton onClick={handleClickLike}>
                            <ThumbUp />
                        </IconButton>
                         {playlist.likes}
                    </Typography>
                    <Typography>
                        <IconButton onClick={handleClickDislike}>
                            <ThumbDown />
                        </IconButton> 
                        {playlist.dislikes}
                    </Typography>
                </Grid>
                
                <Grid item xs={3} container direction="column" alignItems={"flex-end"}>
                    {
                        trashCan
                    }
                    <IconButton onClick={handleCloseList}>
                        <ExpandLess />
                    </IconButton>
                </Grid>
                
                <SongList />
                <Button onClick={handleClickDuplicate} variant="contained">
                    Duplicate
                </Button>
                <PublishedListBottomBar playlist={playlist} />
            </Grid>
        </ListItemButton>
    );
}