import { Box, Button, Grid } from "@mui/material";
import { useContext, useState } from "react";
import AuthContext from "../auth";
import CommentBox from "./CommentBox";
import YoutubePlayer from "./YoutubePlayer";

export default function PlayerCommentBox(props) {

    const [onPlayer, setOnPlayer] = useState(true);

    const { auth } = useContext(AuthContext);

    let window = onPlayer ? <YoutubePlayer videoEndCallback={props.videoEndCallback} /> : <CommentBox />

    //window = <CommentBox />;

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
        <Grid container direction={"column"} sx={{height: '100%', width: '100%'}} alignItems={'flex-start'}>
            <Grid item xs={1} container direction={"row"} sx={{height: '100%'}}> 
                <Grid item xs={6}>
                    <Button onClick={handlePlayerButton}>
                        Player
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    {
                        commentButton
                    }
                </Grid>
            </Grid>
            <Grid item xs={11} direction="column" container sx={{height: '90%', width: '100%'}}>
            {
                window
            }
            </Grid>
        </Grid>
    )
}