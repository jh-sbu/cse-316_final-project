import { Typography } from "@mui/material"
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";
import PlaylistCardClosed from "./PlaylistCardClosed";
import PlaylistCardOpened from "./PlaylistCardOpened";

export default function PlaylistCard(props) {
    // Needs two props from parent - 'open': bool and the actual card

    const {playlist} = props;

    const { store } = useContext(PlaylistStoreContext);

    let CardToDisplay = store.openedList && playlist._id === store.openedList._id ?
        <PlaylistCardOpened playlist={playlist} />
        : <PlaylistCardClosed playlist={playlist} />
    

    return (
        CardToDisplay
    )
}