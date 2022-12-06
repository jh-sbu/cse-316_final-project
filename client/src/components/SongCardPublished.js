import { Box, Button, IconButton, Link, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { color } from '@mui/system';
import PlaylistStoreContext from '../store/PlaylistStore';
import { Edit } from '@mui/icons-material';

function SongCardPublished(props) {
    //const { store } = useContext(GlobalStoreContext);
    const { store } = useContext(PlaylistStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            //console.log("It gets here");
            //store.showEditSongModal(index, song);
            console.log("Use the edit button to edit songs now");
        }
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

    return (
        <ListItem 
            id={'song-' + index + '-card'}
            key={index}
            draggable="true"
            onClick={handleClick}
            sx={{ marginTop: '15px', display: 'flex', p: 1, borderRadius: '30px', bgcolor: '#e1e4cb', '&:hover': {bgcolor: '#b28704'}}}
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
        </ListItem>
    )
    
}

export default SongCardPublished;