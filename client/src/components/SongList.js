import { useContext } from "react"
import PlaylistStoreContext from "../store/PlaylistStore"
import SongCard from "./SongCard";

export default function SongList(props) {

    const { store } = useContext(PlaylistStoreContext);

    return (
        <Box>
            <List
                id="song-cards-list"
                sx={{ width: '100%', bgcolor: '#e6e6e6'}}
            >
                {
                    store.openedList.songs.map((song, index) => (
                        <SongCard>
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                        </SongCard>
                    ))
                }
            </List>
        </Box>
    )
}