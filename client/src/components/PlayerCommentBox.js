import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import CommentBox from "./CommentBox";
import YoutubePlayer from "./YoutubePlayer";

export default function PlayerCommentBox(props) {

    const [onPlayer, setOnPlayer] = useState(false);

    let window = onPlayer ? <YoutubePlayer videoEndCallback={props.videoEndCallback} /> : <CommentBox />

    const handlePlayerButton = (event) => {
        setOnPlayer(true);
    }

    const handleCommentsButton = (event) => {
        setOnPlayer(false);
    }

    return (
        <Grid container flexDirection={"column"}>
            <Box>
                <Button onClick={handlePlayerButton}>
                    Player
                </Button>
                <Button onClick={handleCommentsButton}>
                    Comments
                </Button>
            </Box>
            {
                window
            }
        </Grid>
    )
}