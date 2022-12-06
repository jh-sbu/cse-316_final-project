import { Delete, ExpandMore, ThumbDown, ThumbUp, UnfoldMore } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Link, ListItem, Typography } from "@mui/material";
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";

export default function PublishedCardClosed(props) {

    const { store } = useContext(PlaylistStoreContext);

    let playlist = props.playlist;

    //console.log(playlist);

    const openList = (event) => {
        //console.log("Trying to open list:");
        //console.log(playlist);
        event.preventDefault();
        store.setOpenedList(playlist);
    }

    const handleClickDelete = (event) => {
        event.preventDefault();
        store.markListForDeletion(playlist._id)
    }

    return (
        <ListItem
            id = {playlist.id}
            key = {playlist.id}
            sx = {{ marginTop: '15px', display: 'flex', p: 1, borderRadius: '30px', bgcolor: '#e1e4cb', '&:hover': {bgcolor: '#b28704'}}}
            style = {{ width: '100%', fontSize: '48pt' }}
        >
            <Grid container direction="row">
                <Grid item xs={6}>
                    <Grid container direction="column">
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
                    <IconButton onClick={openList}>
                        <ExpandMore />
                    </IconButton>
                </Grid>
            </Grid>
        </ListItem>
    );
}