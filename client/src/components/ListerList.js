import { List } from "@mui/material"
import { useContext, useEffect } from "react";
import GlobalStoreContext from "../store";
import PlaylistStoreContext from "../store/PlaylistStore";
import PlaylistCard from "./PlaylistCard";

export default function ListerList(props) {

    const { store } = useContext(PlaylistStoreContext);

    //console.log("Here we go");
    //console.log(store)

    useEffect(() => {
        store.loadPlaylists()
    }, [])

    return (
        <List sx={{ width: '100%', lef: '0%', bgcolor: '#e6e6e6' }}>
            {
                store.playlists.map((playlist) => (
                    <PlaylistCard playlist={playlist} key={playlist._id}/>
                ))
            }
        </List>
    )

}