import { Box, List } from "@mui/material";
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
        <Box>
            <List
                id="song-cards-list"
                sx={{ width: '100%', bgcolor: '#e6e6e6'}}
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
        </Box>
    )
}