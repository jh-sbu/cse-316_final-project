import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Alert, AlertTitle, Button, Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 4
};

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong () {
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong () {
        store.hideModals();
    }
    
    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    return (
        <Modal open={store.currentModal === "REMOVE_SONG"}>
            <Grid justifyContent={"flex-center"} sx={style}>
                <Alert severity='warning'>
                    <AlertTitle>Delete List?</AlertTitle>
                    Are you sure you want to remove {songTitle} from the playlist?
                </Alert>
                <Grid container justifyContent="flex-center" direction="row">
                    <Grid item xs={8}>
                        <Button onClick={handleConfirmRemoveSong}>
                            Confirm
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleCancelRemoveSong}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    )

    /*return (
        <Modal
            //open={store.listMarkedForDeletion !== null}
            open={store.currentModal === "REMOVE_SONG"}
        >
            <Box sx={style}>
            <div
        id="remove-song-modal"
        className={modalClass}
        data-animation="slideInOutLeft">
        <div className="modal-root" id='verify-remove-song-root'>
            <div className="modal-north">
                Remove {songTitle}?
            </div>
            <div className="modal-center">
                <div className="modal-center-content">
                    Are you sure you wish to remove <span>{songTitle}</span> from the playlist?
                </div>
            </div>
            <div className="modal-south">
                <input type="button" 
                    id="remove-song-confirm-button" 
                    className="modal-button" 
                    onClick={handleConfirmRemoveSong} 
                    value='Confirm' />
                <input 
                    type="button" 
                    id="remove-song-cancel-button" 
                    className="modal-button" 
                    onClick={handleCancelRemoveSong} 
                    value='Cancel' />
            </div>
        </div>
    </div>
            </Box>
        </Modal>
    );*/
}