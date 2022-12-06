import { Typography } from "@mui/material"
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";
import PlaylistCardClosed from "./PlaylistCardClosed";
import PlaylistCardOpened from "./PlaylistCardOpened";
import PublishedCardClosed from "./PublishedCardClosed";
import PublishedCardOpen from "./PublishedCardOpened";

export default function PlaylistCard(props) {
    // Needs two props from parent - 'open': bool and the actual card

    const {playlist} = props;

    const { store } = useContext(PlaylistStoreContext);

    //let CardToDisplay = store.openedList && playlist._id === store.openedList._id ?
    //    <PlaylistCardOpened playlist={playlist} />
    //    : <PlaylistCardClosed playlist={playlist} />

    //let CardToDisplay = store.openedList && playlist._id === store.openedList._id ?
    //    <PublishedCardOpen playlist={playlist} />
    //    : <PublishedCardClosed playlist={playlist} />
    
    let CardToDisplay = ""

    if(playlist.published) {
        if(store.openedList && playlist._id === store.openedList._id) {
            CardToDisplay = <PublishedCardOpen playlist={playlist} />
        } else {
            CardToDisplay = <PublishedCardClosed playlist={playlist} />
        }
    } else {
        if(store.openedList && playlist._id === store.openedList._id) {
            CardToDisplay = <PlaylistCardOpened playlist={playlist} />
        } else {
            CardToDisplay = <PlaylistCardClosed playlist={playlist} />
        }
    }


    return (
        CardToDisplay
    )
}