import { Button } from "@mui/material";
import { useContext } from "react";
import GlobalStoreContext from "../store";
import PlaylistStoreContext from "../store/PlaylistStore";


export default function CreateNewListBar(props) {
    const { store } = useContext(PlaylistStoreContext)

    const handleCreateNewList = () => {
        store.createPlaylist();
    }

    return (
        <Button onClick={handleCreateNewList}>
            Add List
        </Button>
    )
}