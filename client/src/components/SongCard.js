import { Box, Button, IconButton, Link, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { color } from '@mui/system';
import PlaylistStoreContext from '../store/PlaylistStore';
import { Edit } from '@mui/icons-material';

function SongCard(props) {
    //const { store } = useContext(GlobalStoreContext);
    const { store } = useContext(PlaylistStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    
    function handleRemoveSong(event) {
        event.preventDefault();
        event.stopPropagation();
        //console.log("Got here");
        store.showRemoveSongModal(index, song);
    }

    function handleEditSong(event) {
        event.preventDefault();
        event.stopPropagation();
        store.showEditSongModal(index, song);
    }

    function handleClick(event) {
        event.stopPropagation();
        store.playPlaylist(store.openedList, index);
        // DOUBLE CLICK IS FOR SONG EDITING
        /*if (event.detail === 2) {
            //console.log("It gets here");
            //store.showEditSongModal(index, song);
            console.log("Use the edit button to edit songs now");
        }*/
    }

    let cardClass = "list-card unselected-list-card";

    const songCardStyle = {
        songCard: {
            marginTop: '15px', 
            display: 'flex', 
            p: 1, 
            borderRadius: '30px', 
            bgcolor: '#e1e4cb',
            '&:hover': {
                bgcolor: '#b23c17',
                color: 'white'
            }
        }
    }

    let bgcolor = "#e1e4cb";
    let bgcolor_selected = "#b28704"

    if(store.playingList && store.playingIndex === index) {
        bgcolor = "#ffeb3b"
        bgcolor_selected = "#b2a429"
    }

    return (
        <ListItem 
            id={'song-' + index + '-card'}
            key={index}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
            sx={{ marginTop: '15px', display: 'flex', p: 1, borderRadius: '30px', bgcolor: bgcolor, '&:hover': {bgcolor: bgcolor_selected}}}
            style={{ width: '100%', fontSize: '28pt' }}
        >
            <Box sx={{flexGrow: 1}}>
                {index + 1}.
                <Link 
                    id={'song-' + index + '-link'}
                    href={"https://www.youtube.com/watch?v=" + song.youTubeId}
                >
                    {song.title}
                </Link>
                {" by "}
                <Link 
                    id={'song-' + index + '-link'}
                    href={"https://www.youtube.com/watch?v=" + song.youTubeId}
                >
                    {song.artist}
                </Link>
            </Box>
            <IconButton
                id={"edit-song-" + index}
                onClick={handleEditSong}
                aria-label="Edit Song"
            >
                <Edit style={{fontSize: '24pt'}}/>
            </IconButton>
            <IconButton
                id={"remove-song-" + index}
                onClick={handleRemoveSong}
                aria-label="Remove Song"
            >
                <DeleteIcon style={{fontSize: '24pt'}} />
            </IconButton>
        </ListItem>
    )
    
}

export default SongCard;