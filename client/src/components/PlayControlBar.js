import { FastForward, FastRewind, PlayArrow, Stop } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";

export default function PlayControlBar(props) {

    const { store } = useContext(PlaylistStoreContext);

    return (
        <Grid container direction="row" justifyContent={"center"}>
            <IconButton>
                <FastRewind />
            </IconButton>
            <IconButton>
                <Stop />
                
            </IconButton>
            <IconButton>
                <PlayArrow />
            </IconButton>
            <IconButton>
                <FastForward />
            </IconButton>
        </Grid>
    )

}