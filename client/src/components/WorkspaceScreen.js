import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth/index.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext)
    store.history = useHistory();
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    //console.log("Logged in: " + auth.loggedIn)
    if(store.currentList === null) {
        store.history.push("/");
        return null;
    }
    
    let handleKeyPress = (event) => {
        //event.preventDefault();
        //console.log("You pressed a key!");
        store.handleKeyPress(event);
    }

    return (
        <Box onKeyDown={handleKeyPress} tabIndex={-1}>
            <List 
                id="playlist-cards" 
                sx={{ width: '100%', bgcolor: '#e6e6e6' }}
            >
                {
                    store.currentList.songs.map((song, index) => (
                        <SongCard
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                        />
                    ))  
                }
            </List>            
         { modalJSX }
         </Box>
    )
}

export default WorkspaceScreen;