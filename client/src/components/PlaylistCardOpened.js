import { Delete, ExpandLess, UnfoldMore } from "@mui/icons-material";
import { Box, Button, Grid, Link, ListItem, Typography } from "@mui/material";
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";
import ListEditBar from "./ListEditBar";
import SongList from "./SongList";

export default function PlaylistCardOpened(props) {

    let playlist = props.playlist;

    const { store } = useContext(PlaylistStoreContext);

    //console.log(playlist);

    const handleCloseList = (event) => {
        event.preventDefault();
        store.setOpenedList(null);
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
                    <SongList />
                    <ListEditBar>
                        
                    </ListEditBar>
                </Grid>
                <Grid item xs={2} 
                    sx={{marginTop: '1px', borderRadius: '1px'}}
                    style = {{fontSize: '12pt' }}>
                    <Grid container direction="column">
                        <Button>
                            <Delete />
                        </Button>
                        <Button onClick={handleCloseList}>
                            <ExpandLess />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
}