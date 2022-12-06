import { Box, Grid, List } from "@mui/material";
import { Fragment, useContext } from "react"
import PlaylistStoreContext from "../store/PlaylistStore"
import MUIEditSongModal from "./MUIEditSongModal";
import MUIRemoveSongModal from "./MUIRemoveSongModal";
import SongCard from "./SongCard";
import SongCardPublished from "./SongCardPublished";

export default function SongList(props) {

    const { store } = useContext(PlaylistStoreContext);

    //console.log(store)

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let songList = ""

    if(store.openedList.published) {
        songList = (
            <Fragment>
                {
                    store.openedList.songs.map((song, index) => (
                        <SongCardPublished
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                        /> 
                    ))
                }
            </Fragment>
        )
    } else {
        songList = (
            <Fragment>
                {
                    store.openedList.songs.map((song, index) => (
                        <SongCard
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                        /> 
                    ))
                }
            </Fragment>
        )
    }

    return (
        <Grid container sx={{ height: '100%', overflow: 'scroll'}}>
            <List
                id="song-cards-list"
                sx={{ width: '100%', height: '100%', overflow: 'scroll'}}
            >
                {
                    songList
                }
            </List>
            {
                modalJSX
            }
        </Grid>
    )
}