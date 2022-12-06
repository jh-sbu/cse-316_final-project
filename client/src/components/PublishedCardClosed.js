import { Delete, ExpandMore, UnfoldMore } from "@mui/icons-material";
import { Box, Button, Grid, Link, ListItem, Typography } from "@mui/material";
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
                <Grid item xs={10}>
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
                <Grid item xs={2} 
                    sx={{marginTop: '1px', borderRadius: '1px'}}
                    style = {{fontSize: '12pt' }}>
                    <Grid container direction="column">
                        <Button onClick={handleClickDelete}>
                            <Delete />
                        </Button>
                        <Button onClick={openList}>
                            <ExpandMore />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
}