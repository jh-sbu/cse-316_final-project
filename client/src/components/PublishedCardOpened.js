import { Delete, ExpandLess, ThumbDown, ThumbUp, UnfoldMore } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Link, ListItem, ListItemButton, Typography } from "@mui/material";
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";
import ListEditBar from "./ListEditBar";
import PublishedListBottomBar from "./PublishedListBottomBar";
import SongList from "./SongList";

export default function PublishedCardOpen(props) {

    let playlist = props.playlist;

    const { store } = useContext(PlaylistStoreContext);

    //console.log(playlist);

    const handleCloseList = (event) => {
        event.preventDefault();
        store.setOpenedList(null);
    }

    const handleClickDelete = (event) => {
        event.stopPropagation();
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

    return (
        <ListItemButton
            id = {playlist.id}
            key = {playlist.id}
            sx = {{ marginTop: '15px', display: 'flex', p: 1, borderRadius: '30px', bgcolor: '#e1e4cb', '&:hover': {bgcolor: '#b28704'}}}
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
                            By: {playlist.ownerUsername}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3} container direction="row" justifyContent={"flex-end"}>
                    <Typography>
                        <IconButton>
                            <ThumbUp />
                        </IconButton>
                         {playlist.likes}
                    </Typography>
                    <Typography>
                        <IconButton>
                            <ThumbDown />
                        </IconButton> 
                        {playlist.dislikes}
                    </Typography>
                </Grid>
                
                <Grid item xs={3} container direction="column" alignItems={"flex-end"}>
                    <IconButton onClick={handleClickDelete}>
                        <Delete />
                    </IconButton>
                    <IconButton onClick={handleCloseList}>
                        <ExpandLess />
                    </IconButton>
                </Grid>
                
                <SongList />
                <Button onClick={handleClickDuplicate}>
                    Duplicate
                </Button>
                <PublishedListBottomBar playlist={playlist} />
            </Grid>
        </ListItemButton>
    );
}