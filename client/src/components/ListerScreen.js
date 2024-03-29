import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import GlobalStoreContext from "../store";
import { PlaylistStoreContextProvider } from "../store/PlaylistStore";
import CreateNewListBar from "./CreateNewListBar";
import ListerList from "./ListerList";
import ListerTopBar from "./ListerTopBar";
import PlayerCommentBox from "./PlayerCommentBox";

export default function ListerScreen(props) {

    const { store } = useContext(GlobalStoreContext)

    const handleVideoEnd = () => {
        console.log("Video finished playing");
    }

    return (
        <PlaylistStoreContextProvider>
            <Box sx={{height: '70%'}}>
                <ListerTopBar />
                <Grid container direction="row" sx={{height: '100%'}}>
                    <Grid item xs={7} sx={{height: '100%'}}>
                        <ListerList />
                    </Grid>
                    <Grid item xs={5} container sx={{height: '100%'}}>
                        <PlayerCommentBox videoEndCallback={handleVideoEnd}/>
                    </Grid>
                </Grid>
                <CreateNewListBar />
            </Box>
        </PlaylistStoreContextProvider>
    )
}
