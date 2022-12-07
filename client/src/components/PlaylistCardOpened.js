import { Delete, ExpandLess, UnfoldMore } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Link, ListItem, ListItemButton, Typography } from "@mui/material";
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";
import ListEditBar from "./ListEditBar";
import SongList from "./SongList";

export default function PlaylistCardOpened(props) {

    let playlist = props.playlist;

    const { store } = useContext(PlaylistStoreContext);

    //console.log(playlist);

    const handleCloseList = (event) => {
        event.stopPropagation();
        store.setOpenedList(null);
    }

    const handleClickDelete = (event) => {
        event.stopPropagation();
        store.markListForDeletion(playlist._id)
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

    let bgColor = "#e1e4cb";
    let bgColorSelected = "#b28704";

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
            onClick={handleClickPlaylist}
        >
            <Grid container direction="row">
                <Grid item xs={9} container direction={"column"}>
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
                
                <Grid item xs={3} container direction="column" alignItems={"flex-end"}>
                    <IconButton onClick={handleClickDelete}>
                        <Delete />
                    </IconButton>
                    <IconButton onClick={handleCloseList}>
                        <ExpandLess />
                    </IconButton>
                </Grid>
                
                <SongList />
                <ListEditBar />
            </Grid>
        </ListItemButton>
    );
}