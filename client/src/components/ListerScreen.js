import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import GlobalStoreContext from "../store";
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
        <Box>
            <ListerTopBar />
            <Typography>
                Hello!
            </Typography>
            <Grid container>
                <Grid item xs={8}>
                    <ListerList />
                </Grid>
                <Grid item xs={4}>
                    <PlayerCommentBox videoEndCallback={handleVideoEnd}/>
                </Grid>
            </Grid>
            <CreateNewListBar />
        </Box>
        
    )
}
