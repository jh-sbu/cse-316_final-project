import { Box, Typography } from "@mui/material";
import ListerTopBar from "./ListerTopBar";
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
            <YoutubePlayer videoEndCallback={handleVideoEnd}>
                
            </YoutubePlayer>
        </Box>
        
    )
}
