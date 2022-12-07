import { Delete, ExpandMore, UnfoldMore } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Link, ListItem, ListItemButton, Typography } from "@mui/material";
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";

export default function PlaylistCardClosed(props) {

    const { store } = useContext(PlaylistStoreContext);

    let playlist = props.playlist;

    //console.log(playlist);

    const openList = (event) => {
        //console.log("Trying to open list:");
        //console.log(playlist);
        event.stopPropagation();
        store.setOpenedList(playlist);
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
            onClick = {handleClickPlaylist}
        >
            <Grid container direction="row">
                <Grid item xs={10}>
                    <Grid container direction="column">
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
                </Grid>
                <Grid item xs={2} 
                    sx={{marginTop: '1px', borderRadius: '1px'}}
                    style = {{fontSize: '12pt' }} container direction="column" alignItems={"flex-end"}>
                        <IconButton onClick={handleClickDelete}>
                            <Delete />
                        </IconButton>
                        <IconButton onClick={openList}>
                            <ExpandMore />
                        </IconButton>
                </Grid>
            </Grid>
        </ListItemButton>
    );
}