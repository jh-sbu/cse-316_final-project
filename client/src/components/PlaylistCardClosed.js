import { Box, Grid, Link, ListItem, Typography } from "@mui/material";

export default function PlaylistCardClosed(props) {

    let playlist = props.playlist;

    console.log(playlist);

    return (
        <ListItem
            id = {playlist.id}
            key = {playlist.id}
            sx = {{ marginTop: '15px', display: 'flex', p: 1, borderRadius: '30px', bgcolor: '#e1e4cb', '&:hover': {bgcolor: '#b28704'}}}
            style = {{ width: '100%', fontSize: '48pt' }}
        >
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
        </ListItem>
    );
}