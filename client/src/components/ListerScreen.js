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
                <Typography>
                    Hello!
                </Typography>
                <Grid container sx={{height: '100%'}}>
                    <Grid item xs={7}>
                        <ListerList />
                    </Grid>
                    <Grid item xs={5}>
                        <PlayerCommentBox videoEndCallback={handleVideoEnd}/>
                    </Grid>
                </Grid>
                <CreateNewListBar />
            </Box>
        </PlaylistStoreContextProvider>
    )
}
