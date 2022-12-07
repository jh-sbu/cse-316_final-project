import { Box } from "@mui/material";
import { useContext } from "react";
import YouTube from "react-youtube"
import PlaylistStoreContext from "../store/PlaylistStore";
import NowPlayingBox from "./NowPlayingBox";

export default function YoutubePlayer(props) {

    const { store } = useContext(PlaylistStoreContext);

    const playerOptions = {
        height: '270px',
        width: '480px',
        playerVars: {
            autoPlay: 0
        }
    }

    const handleVideoEnd = (event) => {
        event.preventDefault();
        console.log("Next video autoplay not implemented yet");
    }

    return (
        <Box>
            <YouTube
                videoId={"mqmxkGjow1A"}
                onEnd={handleVideoEnd}
                opts={playerOptions}
            >

            </YouTube>
            <NowPlayingBox />
        </Box>
    )
}