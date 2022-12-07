import { FastForward, FastRewind, PlayArrow, Stop } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";

export default function PlayControlBar(props) {

    const { store } = useContext(PlaylistStoreContext);

    let player = props.player;

    const handleClickRewind = (event) => {
        event.stopPropagation();
        console.log("Clicked back button");

        store.changeCurrentlyPlaying(store.playingIndex - 1);
    }

    const handleClickStop = (event) => {
        event.stopPropagation();
        //console.log("Stop not implemented!");

        if(player) {
            player.pauseVideo();
        }
    }

    const handleClickPlay = (event) => {
        event.stopPropagation();
        console.log("Play button clicked!");

        //console.log(player);
        //console.log(props);

        if(player) {
            player.playVideo();
        }
    }

    const handleClickFastforward = (event) => {
        event.stopPropagation();
        console.log("Clicked next button");

        store.changeCurrentlyPlaying(store.playingIndex + 1);
    }

    return (
        <Grid container direction="row" justifyContent={"center"}>
            <IconButton onClick={handleClickRewind} disabled={!store.playingList || store.playingIndex <= 0}>
                <FastRewind />
            </IconButton>

            <IconButton onClick={handleClickStop} disabled={!store.playingList}>
                <Stop />
            </IconButton>

            <IconButton onClick={handleClickPlay} disabled={!store.playingList}>
                <PlayArrow />
            </IconButton>

            <IconButton onClick={handleClickFastforward} disabled={!store.playingList || store.playingList.songs.length <= store.playingIndex + 1}>
                <FastForward />
            </IconButton>
        </Grid>
    )

}