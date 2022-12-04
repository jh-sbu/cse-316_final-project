import { Box, Typography } from "@mui/material";
import ListerTopBar from "./ListerTopBar";
import PlayerCommentBox from "./PlayerCommentBox";
import YoutubePlayer from "./YoutubePlayer";

export default function ListerScreen(props) {

    const handleVideoEnd = () => {
        console.log("Video finished playing");
    }

    return (
        <Box>
            <ListerTopBar />
            <Typography>
                Hello!
            </Typography>
            <PlayerCommentBox videoEndCallback={handleVideoEnd}/>
        </Box>
        
    )
}
