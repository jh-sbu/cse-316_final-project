import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AppBar, Button, Grid, TextField, Typography } from '@mui/material';
import PlaylistStoreContext from '../store/PlaylistStore';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(PlaylistStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    //console.log("Tries to open");

    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.songIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    //console.log("HELLO");
    //console.log(store.currentModal);


    let testfunc = () => {
        return (
            <Modal open={store.openModal === "EDIT_SONG"}>
                <Box sx={style}>
                    <Grid container direction={"column"}>
                        <Grid item>
                            <AppBar sx={{display: "flex", alignItems: "center"}}>
                                <Typography>
                                    Edit Song
                                </Typography>
                            </AppBar>
                        </Grid>
                        <Grid container direction={"row"}>
                            <Grid item xs={5}>
                                <Typography>
                                    Title:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField defaultValue={store.currentSong.title} onChange={handleUpdateTitle}>

                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container direction={"row"}>
                            <Grid item xs={5}>
                                <Typography>
                                    Artist:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField defaultValue={store.currentSong.artist} onChange={handleUpdateArtist}>

                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container direction={"row"}>
                            <Grid item xs={5}>
                                <Typography>
                                    Youtube Song ID:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField defaultValue={store.currentSong.youTubeId} onChange={handleUpdateYouTubeId}>

                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container direction={"row"}>
                            <Grid item xs={2}>
                                <Button onClick={handleConfirmEditSong}>
                                    Confirm
                                </Button>
                            </Grid>
                            <Grid item xs={8}>

                            </Grid>
                            <Grid item xs={2}>
                                <Button onClick={handleCancelEditSong}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        )
    }

    return testfunc();

    return (
        <Modal
            open={store.currentModal === "EDIT_SONG"}
        >
            <Box sx={style}>
            <div
            id="edit-song-modal"
            className="modal is-visible"
            data-animation="slideInOutLeft">
            <div
                id='edit-song-root'
                className="modal-root">
                <div
                    id="edit-song-modal-header"
                    className="modal-north">Edit Song</div>
                <div
                    id="edit-song-modal-content"
                    className="modal-center">
                    <div id="title-prompt" className="modal-prompt">Title:</div>
                    <input 
                        id="edit-song-modal-title-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={title} 
                        onChange={handleUpdateTitle} />
                    <div id="artist-prompt" className="modal-prompt">Artist:</div>
                    <input 
                        id="edit-song-modal-artist-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={artist} 
                        onChange={handleUpdateArtist} />
                    <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div>
                    <input 
                        id="edit-song-modal-youTubeId-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={youTubeId} 
                        onChange={handleUpdateYouTubeId} />
                </div>
                <div className="modal-south">
                    <input 
                        type="button" 
                        id="edit-song-confirm-button" 
                        className="modal-button" 
                        value='Confirm' 
                        onClick={handleConfirmEditSong} />
                    <input 
                        type="button" 
                        id="edit-song-cancel-button" 
                        className="modal-button" 
                        value='Cancel' 
                        onClick={handleCancelEditSong} />
                </div>
            </div>
        </div>
            </Box>
        </Modal>
    );
}