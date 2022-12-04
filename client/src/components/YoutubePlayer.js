import { Box } from "@mui/material";
import YouTube from "react-youtube"

export default function YoutubePlayer(props) {

    return (
        <Box>
            <YouTube
                videoId={"mqmxkGjow1A"}
                onEnd={props.videoEndCallback}
            >

            </YouTube>
        </Box>
    )
}