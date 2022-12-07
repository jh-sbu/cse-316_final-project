import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";
import PlayControlBar from "./PlayControlBar";

export default function NowPlayingBox(props) {

    const { store } = useContext(PlaylistStoreContext);

    let playlistName = "";
    let songNum = "";
    let songTitle = "";
    let artistName = "";

    if(store.playingList) {
        playlistName = store.playingList.name;
        if(store.playingIndex < store.playingList.songs.length) {
            songNum = store.playingIndex + 1;
        songTitle = store.playingList.songs[store.playingIndex].title;
        artistName = store.playingList.songs[store.playingIndex].artist;
        }
    }

    return (
        <Box sx={{display: 'flex', p: 1, borderRadius: '30px', bgcolor: '#00bcd4'}}>
            <Grid direction="column" container alignItems={"center"}>
                <Typography>
                    Now Playing
                </Typography>
                <Grid item direction="column" container alignItems={"flex-start"}>
                    <Typography>
                        Playlist: {playlistName}
                    </Typography>
                    <Typography>
                        Song #: {songNum}
                    </Typography>
                    <Typography>
                        Title: {songTitle}
                    </Typography>
                    <Typography>
                        Artist: {artistName}
                    </Typography>
                </Grid>
                <PlayControlBar player={props.player}/>
            </Grid>
        </Box>
    )

}