import { Box, List } from "@mui/material"
import { useContext, useEffect } from "react";
import GlobalStoreContext from "../store";
import PlaylistStoreContext from "../store/PlaylistStore";
import MUIDeleteModal from "./MUIDeleteModal";
import PlaylistCard from "./PlaylistCard";

export default function ListerList(props) {

    const { store } = useContext(PlaylistStoreContext);

    //console.log("Here we go");
    //console.log(store)

    useEffect(() => {
        store.loadPlaylists()
    }, [])

    return (
        <Box sx={{height: '100%', overflow: 'scroll'}}>
            <List sx={{ width: '98%', left: '0%', height: '100%', bgcolor: '#e6e6e6', flexDirection: 'row' }}>
                {
                    store.viewedLists.map((playlist) => (
                        <PlaylistCard playlist={playlist} key={playlist._id}/>
                    ))
                }
            </List>
            <MUIDeleteModal />
        </Box>
    )

}