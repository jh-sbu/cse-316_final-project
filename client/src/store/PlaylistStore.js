import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../auth";
import jsTPS from "../common/jsTPS";

import api from './store-request-api'

export const PlaylistStoreContext = createContext({});

const tps = new jsTPS()

function PlaylistStoreContextProvider(props) {

    const [store, setStore] = useState({
        playlists: [],
        viewedLists: [],
        openedList: null,
        playingList: null
    })

    const history = useHistory();

    const { auth } = useContext(AuthContext);

    store.loadPlaylists = () => {
        (async () => {
            const response = await api.getPlaylists();
            //console.log(response)
            if(response.data.success) { 
                let playlists = response.data.playlists;
                return setStore({
                    ...store,
                    playlists: playlists
                })
            }
        })();
    }

    store.createPlaylist = () => {
        if(!auth.loggedIn)
            return;
        let newListName = store.getNewPlaylistName("Untitled ");

        //console.log("Got the name " + newListName);
        //console.log("Now create the list");

        console.log(auth.user);

        let newList = {
            name: newListName,
            ownerUsername: auth.user.userName,
            likes: 0,
            dislikes: 0,
            published: false,
            songs: [],
            comments: [],
            ownerEmail: auth.user.email
        };

        console.log("Test");

        (async () => {
            const response = await api.createPlaylist(newList.name, newList.ownerEmail, newList.ownerUsername, newList.likes, newList.dislikes, newList.published,
                newList.songs, newList.comments).then(() => {
                    store.loadPlaylists();
                });
        })();
    }

    store.getNewPlaylistName = (name) => {
        let newListName = name;
        let newListNumber = 0;
        let myLists = store.playlists.filter(list => {
            return list.ownerEmail === auth.user.email;
        });

        while(myLists.find(x => x.name === newListName + String(newListNumber))) {
            newListNumber += 1;
            //console.log("Name conflict! Renaming")
        }

        //console.log("List number: " + newListNumber)

        console.log(myLists);

        return newListName + String(newListNumber);
    }

    store.setOpenedList = (playlist) => {
        //console.log("Trying to set opened list in store");
        //console.log(store);
        //console.log(playlist);
        //console.log(store.playlists.includes(playlist));
        if(!playlist || store.playlists.includes(playlist)) {
            return setStore({
                ...store,
                openedList: playlist
            })
        }
        console.log(store)
    }

    return (
        <PlaylistStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </PlaylistStoreContext.Provider>
    );

}

export default PlaylistStoreContext;
export { PlaylistStoreContextProvider }