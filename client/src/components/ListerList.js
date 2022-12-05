import { List } from "@mui/material"
import { useContext, useEffect } from "react";
import GlobalStoreContext from "../store";
import PlaylistCard from "./PlaylistCard";

export default function ListerList(props) {

    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs()
    }, [])

    console.log(typeof testPlaylists)

    return (
        <List sx={{ width: '100%', lef: '0%', bgcolor: '#e6e6e6' }}>
            {
                store.idNamePairs.map((pair) => (
                    <PlaylistCard playlist={pair} key={pair._id}/>
                ))
            }
        </List>
    )

}