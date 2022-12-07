import { Box } from "@mui/material";
import { useContext, useRef, useState } from "react";
import YouTube from "react-youtube"
import PlaylistStoreContext from "../store/PlaylistStore";
import NowPlayingBox from "./NowPlayingBox";

export default function YoutubePlayer(props) {

    const { store } = useContext(PlaylistStoreContext);

    const [ player, setPlayer ] = useState(null);

    const playerOptions = {
        height: '270px',
        width: '480px',
        playerVars: {
            autoPlay: 0,
            controls: 0
        }
    }

    let videoId="";

    if(store.playingList && store.playingIndex >= 0 && store.playingIndex < store.playingList.songs.length) {
        videoId=store.playingList.songs[store.playingIndex].youTubeId;
    }

    const handleVideoEnd = (event) => {
        console.log("Next video autoplay not implemented yet");
    }

    const handlePlayerReady = (event) => {
        console.log("The player is now ready");
        //player = event.target;

        setPlayer(event.target);

        //event.target.playVideo();

        //console.log(player);
    }

    return (
        <Box>
            <YouTube
                videoId={videoId}
                onEnd={handleVideoEnd}
                onReady={handlePlayerReady}
                opts={playerOptions}
            >

            </YouTube>
            <NowPlayingBox player={player} />
        </Box>
    )
}