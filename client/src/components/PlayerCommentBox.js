import { Box, Button, Grid } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../auth";
import CommentBox from "./CommentBox";
import YoutubePlayer from "./YoutubePlayer";

export default function PlayerCommentBox(props) {

    const [onPlayer, setOnPlayer] = useState(true);

    const { auth } = useContext(AuthContext);

    let window = onPlayer ? <YoutubePlayer videoEndCallback={props.videoEndCallback} /> : <CommentBox />

    const handlePlayerButton = (event) => {
        setOnPlayer(true);
    }

    const handleCommentsButton = (event) => {
        setOnPlayer(false);
    }

    let commentButton = ""

    if(auth.loggedIn) {
        commentButton = (
            <Button onClick={handleCommentsButton}>
                Comments
            </Button>
        )
    }

    return (
        <Grid container direction={"column"} sx={{height: '100%', overflow: 'scroll', width: '100%'}} alignItems={'flex-start'}>
            <Grid item sx={1}>

            
            <Box>
                <Button onClick={handlePlayerButton}>
                    Player
                </Button>
                {
                    commentButton
                }
            </Box>
            </Grid>
            <Grid item sx={11}>
            {
                window
            }
            </Grid>
        </Grid>
    )
}