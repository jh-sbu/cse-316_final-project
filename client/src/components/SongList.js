import { Box, Grid, List } from "@mui/material";
import { useContext } from "react"
import PlaylistStoreContext from "../store/PlaylistStore"
import MUIEditSongModal from "./MUIEditSongModal";
import MUIRemoveSongModal from "./MUIRemoveSongModal";
import SongCard from "./SongCard";

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

    return (
        <Grid container sx={{ height: '100%', overflow: 'scroll'}}>
            <List
                id="song-cards-list"
                sx={{ width: '100%', height: '100%', overflow: 'scroll'}}
            >
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
            </List>
            {
                modalJSX
            }
        </Grid>
    )
}