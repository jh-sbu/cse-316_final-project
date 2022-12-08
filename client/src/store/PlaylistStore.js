import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../auth";
import jsTPS from "../common/jsTPS";
import CreateSong_Transaction from "../transactions/CreateSong_Transaction";
import MoveSong_Transaction from "../transactions/MoveSong_Transaction";
import RemoveSong_Transaction from "../transactions/RemoveSong_Transaction";
import UpdateSong_Transaction from "../transactions/UpdateSong_Transaction";

import api from './store-request-api'

export const PlaylistStoreContext = createContext({});

const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
}

const SearchMode = {
    OWN_LISTS: "OWN_LISTS",
    BY_USER: "BY_USER",
    BY_NAME: "BY_NAME"
}

const SortMethods = {
    NAME_A_Z: (list1, list2) => list1.name.localeCompare(list2.name),
    PUBLISHED_DATE: (list1, list2) => list2.publishDate - list1.publishDate,
    LISTENS: (list1, list2) => list2.listens - list1.listens,
    LIKES: (list1, list2) => list2.likes - list1.likes,
    DISLIKES: (list1, list2) => list2.dislikes - list1.dislikes
}

function PlaylistStoreContextProvider(props) {

    const [store, setStore] = useState({
        playlists: [],
        viewedLists: [],
        openedList: null,
        playingList: null,
        playingIndex: -1,
        openModal: CurrentModal.NONE,
        currentSong: null,
        songIndex: -1,
        listToDelete: null,
        listToDeleteId: null,
        searchMode: SearchMode.OWN_LISTS,
        searchValue: "",
        sortMethod: SortMethods.NAME_A_Z
    })

    const { auth } = useContext(AuthContext);

    const SearchFilters = {
        OWN_LISTS: (searchTerm) => (list) => auth.user ? list.ownerEmail === auth.user.email : false,
        BY_USER: (searchTerm) => (list) => searchTerm === "" ? false : list.ownerUsername.includes(searchTerm) && list.published,
        BY_NAME: (searchTerm) => (list) => searchTerm === "" ? false : list.name.includes(searchTerm) && list.published
    }

    useEffect(() => {
        if(!auth.loggedIn && store.searchMode === SearchMode["OWN_LISTS"]) {
            setStore({
                ...store,
                searchMode: SearchMode["BY_NAME"]
            })
        }
    })

    store.loadPlaylists = () => {
        //console.log(store.sortMethod);

        (async () => {
            const response = await api.getPlaylists();
            //console.log(response)
            if(response.data.success) { 
                let playlists = response.data.playlists;
                let viewedLists = playlists.filter(SearchFilters[store.searchMode](store.searchValue));
                return setStore({
                    ...store,
                    playlists: playlists,
                    openModal: CurrentModal.NONE,
                    viewedLists: viewedLists.sort(store.sortMethod)
                })
            }
        })();
    }

    store.changeCurrentlyPlaying = (newIndex) => {
        if(store.playingList) {
            if(newIndex < store.playingList.songs.length && newIndex >= 0) {
                return setStore({
                    ...store,
                    playingIndex: newIndex
                });
            }
        }
    }

    store.changeSortMethod = (method) => {
        console.log("Changing to sort method:");
        console.log(method)

        if(!SortMethods[method]) {
            console.log("Illegal sort method " + method);
            return;
        }

        (async () => {
            const response = await api.getPlaylists();
            if(response.data.success) {
                let playlists = response.data.playlists;
                let viewedLists = playlists.filter(SearchFilters[store.searchMode](store.searchValue)).sort(SortMethods[method])
                return setStore({
                    ...store,
                    playlists: playlists,
                    openModal: CurrentModal.NONE,
                    viewedLists: viewedLists,
                    sortMethod: SortMethods[method]
                })
            }
        })();
    }

    store.changeSearchAndValue = (mode, value) => {
        console.log("Changing both search method and value:");
        console.log(mode);
        console.log(value);

        if(!SearchMode[mode]) {
            console.log("Illegal search mode " + mode);
            return;
        }

        (async () => {
            const response = await api.getPlaylists();
            if(response.data.success) {
                let playlists = response.data.playlists;
                let viewedLists = playlists.filter(SearchFilters[mode](value)).sort(store.sortMethod);
                return setStore({
                    ...store,
                    playlists: playlists,
                    openModal: CurrentModal.NONE,
                    viewedLists: viewedLists,
                    searchMode: mode,
                    searchValue: value
                })
            }
        })();
    }

    store.playPlaylist = (playlist, index=0) => {
        if(playlist.published) {
            (async () => {
                playlist.listens += 1;
                const response = await api.updatePublishedListById(playlist._id, playlist);
                if(response.data.success) {
                    let updatedLists = store.playlists;
                    let indexToFind = updatedLists.findIndex(x => x._id === playlist._id)
                    updatedLists[indexToFind] = playlist;
                    let viewedLists = updatedLists.filter(SearchFilters[store.searchMode](store.searchValue)).sort(store.sortMethod);
                    return setStore({
                        ...store,
                        playlists: updatedLists,
                        viewedLists: viewedLists,
                        playingList: playlist,
                        playingIndex: index,
                        openModal: CurrentModal.NONE
                    })
                }
            })();
        } else {
            return setStore({
                ...store,
                playingList: playlist,
                playingIndex: index
            })
        }
    }

    store.changeSearchMode = (mode) => {
        //console.log("It tries to change search mode yeah");
        //console.log(mode);
        //console.log(SearchMode[mode]);

        //console.log(store);

        if(!SearchMode[mode]) {
            console.log("Illegal search mode " + mode);
            return;
        } 

        (async () => {
            const response = await api.getPlaylists();
            if(response.data.success) {
                let playlists = response.data.playlists;
                let viewedLists = playlists.filter(SearchFilters[mode](store.searchValue));
                //console.log("Logged in?");
                //console.log(auth.user ? true : false);
                //console.log(auth.user);
                //console.log("Static test");
                //console.log(playlists.filter((list) => !auth.user ? list.ownerEmail === auth.user.email : true))
                //console.log("All visible lists: ");
                //console.log(playlists);
                //console.log("Viewed lists: ");
                //console.log(viewedLists);
                //console.log(SearchFilters[mode]);
                return setStore({
                    ...store,
                    playlists: playlists,
                    openModal: CurrentModal.NONE,
                    viewedLists: viewedLists.sort(store.sortMethod),
                    searchMode: SearchMode[mode]
                })
            }
        })();
    }

    store.changeSearchValue = (value) => {

        //console.log("Searching here");
        //console.log(value);

        (async () => {
            const response = await api.getPlaylists();
            if(response.data.success) {
                let playlists = response.data.playlists;
                let viewedLists = playlists.filter(SearchFilters[store.searchMode](value));
                //console.log(viewedLists);
                return setStore({
                    ...store,
                    playlists: playlists,
                    openModal: CurrentModal.NONE,
                    viewedLists: viewedLists.sort(store.sortMethod),
                    searchValue: value
                })
                
            }
        })();
    }

    store.createPlaylist = () => {
        if(!auth.loggedIn)
            return;
        let newListName = store.getNewPlaylistName("Untitled ");

        console.log(auth.user);

        let newList = {
            name: newListName,
            ownerUsername: auth.user.userName,
            likes: -1,
            dislikes: -1,
            listens: -1,
            published: false,
            publishDate: 0,
            songs: [],
            comments: [],
            ownerEmail: auth.user.email
        };

        (async () => {
            const response = await api.createPlaylist(newList.name, newList.ownerEmail, newList.ownerUsername, 
                newList.likes, newList.dislikes, newList.published, newList.publishDate, newList.listens,
                newList.songs, newList.comments).then(() => {
                    store.loadPlaylists();
                });
        })();
    }

    store.duplicatePlaylist = (playlist) => {
        if(!auth.loggedIn) {
            return;
        }

        let copiedList = playlist;

        copiedList = {
            name: store.getNewPlaylistName(playlist.name),
            ownerUsername: auth.user.userName,
            likes: -1,
            dislikes: -1,
            listens: -1,
            published: false,
            publishDate: 0,
            songs: playlist.songs,
            comments: [],
            ownerEmail: auth.user.email
        }

        console.log("Do you get here");

        //console.log("Creating duplicate list:");
        //console.log(copiedList);

        (async () => {
            const response = await api.createPlaylist(copiedList.name, copiedList.ownerEmail, copiedList.ownerUsername, 
                copiedList.likes, copiedList.dislikes, copiedList.published, copiedList.publishDate, copiedList.listens,
                copiedList.songs, copiedList.comments).then(() => {
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
        tps.clearAllTransactions();
        if(!playlist || store.playlists.includes(playlist)) {
            return setStore({
                ...store,
                openedList: playlist,
                openModal: CurrentModal.NONE,
                currentSong: null,
                songIndex: -1
            })
        }
        console.log(store)
    }

    store.showEditSongModal = (songIndex, songToEdit) => {
        return setStore({
            ...store,
            openModal: CurrentModal.EDIT_SONG,
            currentSong: songToEdit,
            songIndex: songIndex
        })
    }

    store.isEditSongModalOpen = () => {
        return store.openModal === CurrentModal.EDIT_SONG;
    }

    store.showRemoveSongModal = (index, song) => {
        //console.log("And also here");
        //console.log(store);
        return setStore({
            ...store,
            openModal: CurrentModal.REMOVE_SONG,
            currentSong: song,
            songIndex: index
        })
    }

    store.isRemoveSongModalOpen = () => {
        //console.log("Yep here too");
        //console.log(store);
        //console.log(store.openModal);
        //console.log(CurrentModal.REMOVE_SONG);
        //console.log(store.openModal === CurrentModal.REMOVE_SONG);
        return store.openModal === CurrentModal.REMOVE_SONG;
    }

    store.getPlaylistSize = () => {
        return store.openedList.songs.length;
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        console.log("Got here!");
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                return setStore({
                    ...store,
                    openModal: CurrentModal.DELETE_LIST,
                    listIdMarkedForDeletion: id,
                    listToDelete: playlist
                });
                /*storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });*/
            }
        }
        getListToDelete(id);
    }

    store.unmarkListForDeletion = function () {
        return setStore({
            ...store,
            openModal: null
        })
    }

    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            if (response.data.success) {
                store.loadPlaylists();
            }
        }
        processDelete(id);
    }

    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.hideModals = () => {
        setStore({
            ...store,
            openModal: CurrentModal.NONE,
            currentSong: null,
            songIndex: -1,
            listToDeleteId: null,
            listToDelete: null
        })
        /*storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });*/
    }

    store.isDeleteListModalOpen = () => {
        return store.openModal === CurrentModal.DELETE_LIST;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    return setStore({
                        ...store,
                        openedList: playlist
                    })
                    /*storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });*/
                    //history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }

    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.openedList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.openedList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.openedList;      
        list.songs.splice(index, 1); 

        let newPlaying = -2;

        if(store.playingList && store.playingList === store.openedList && store.playingIndex >= index) {
            newPlaying = store.playingIndex - 1
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList(newPlaying);
    }

    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.openedList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "Unknown", "dQw4w9WgXcQ");
    }

    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    

    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.songIndex;
        let song = store.openedList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }

    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.openedList.songs[index];
        //console.log(store)
        //console.log(store.openedList);
        //console.log(store.openedList.songs);
        //console.log(index);
        //console.log(newSongData);
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }

    store.updateCurrentList = (newPlaying = -2) => {
        let newPlaying2 = newPlaying;
        if(newPlaying === -2) {
            newPlaying2 = store.playingIndex;
        }
        (async () => {
            const response = await api.updatePlaylistById(store.openedList._id, store.openedList);
            if(response.data.success) {
                let updatedLists = store.playlists;
                let indexToFind = updatedLists.findIndex(x => x._id === store.openedList._id)//store.openedList._id;
                updatedLists[indexToFind] = store.openedList;
                let viewedLists = updatedLists.filter(SearchFilters[store.searchMode](store.searchValue)).sort(store.sortMethod);
                return setStore({
                    ...store,
                    playlists: updatedLists,
                    viewedLists: viewedLists,
                    openedList: store.openedList,
                    playingIndex: newPlaying2,
                    openModal: CurrentModal.NONE
                })
            }
        })();
    }

    store.makeComment = (comment, list) => {
        if(!auth.loggedIn) {
            console.log("Not logged in, cannot make comment: ")
            console.log(comment);
        }

        let userName = auth.user.userName;
        let newComment = {
            userName: userName,
            comment: comment
        };

        list.comments.push(newComment);

        store.updatePublishedList(list);
    }

    store.likeDislike = (likeVal, list) => {
        if(!auth.loggedIn) {
            console.log("Not logged in, cannot like or dislike!");
            console.log(likeVal);
        }

        if(likeVal === "like") {
            list.likes += 1;
        } else if(likeVal === "dislike") {
            list.dislikes += 1;
        }

        store.updatePublishedList(list);
    }

    store.changeListName = (list, name) => {
        if(list.published) {
            console.log("Cannot change the name of a published list!");
            return;
        } else if(store.playlists.find(x => x.ownerEmail === list.ownerEmail && x._id !== list._id && x.name === name)) {
            console.log("User already has a list with that name!");
        } else {
            (async () => {
                list.name = name;
                const response = await api.updatePlaylistById(list._id, list);
                if(response.data.success) {
                    let updatedLists = store.playlists;
                    let indexToFind = updatedLists.findIndex(x => x._id === list._id)
                    updatedLists[indexToFind] = list;
                    let viewedLists = updatedLists.filter(SearchFilters[store.searchMode](store.searchValue)).sort(store.sortMethod);
                    return setStore({
                        ...store,
                        playlists: updatedLists,
                        viewedLists: viewedLists,
                        openModal: CurrentModal.NONE
                    })
                }
            })();
        }
    }

    store.updatePublishedList = (list) => {
        (async () => {
            const response = await api.updatePublishedListById(list._id, list);
            if(response.data.success) {
                let updatedLists = store.playlists;
                let indexToFind = updatedLists.findIndex(x => x._id === list._id)
                updatedLists[indexToFind] = list;
                let viewedLists = updatedLists.filter(SearchFilters[store.searchMode](store.searchValue)).sort(store.sortMethod);
                return setStore({
                    ...store,
                    playlists: updatedLists,
                    viewedLists: viewedLists,
                    openModal: CurrentModal.NONE
                })
            }
        })();
    }

    store.publishCurrentList = () => {
        if (store.openedList) {
            let list = store.openedList;
            list.published = true;
            list.publishDate = Date.now();
            list.likes = 0;
            list.dislikes = 0;
            list.listens = 0;
            store.updateCurrentList();
        }
    }

    /*store.updateCurrentListOld = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }*/

    // UNDO AND REDO FUNCTIONS
    store.undo = function () {
        tps.undoTransaction();
    }

    store.redo = function () {
        tps.doTransaction();
    }

    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }

    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }

    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }

    store.canClose = function() {
        return (store.currentList !== null);
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