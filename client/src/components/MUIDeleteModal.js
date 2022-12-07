import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Alert, AlertTitle, Button, Grid } from '@mui/material';
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
    justifyContent: "center"
};

export default function MUIDeleteModal() {
    const { store } = useContext(PlaylistStoreContext);
    let name = "";
    if (store.listToDelete) {
        name = store.listToDelete.name;
    }
    function handleDeleteList(event) {
        event.stopPropagation();
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        event.stopPropagation();
        store.unmarkListForDeletion();
    }

    const handleClickModal = (event) => {
        event.stopPropagation();
        console.log("Hello!");
    }

    return (
        <Modal open={store.isDeleteListModalOpen()} onClick={handleClickModal}>
            <Grid justifyContent={"flex-center"} sx={style}>
                <Alert severity='warning'>
                    <AlertTitle>Delete List?</AlertTitle>
                    Are you sure you want to permanently delete the {name} Playlist?
                </Alert>
                <Grid container justifyContent="flex-center" direction="row">
                    <Grid item xs={8}>
                        <Button onClick={handleDeleteList}>
                            Confirm
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    )

    /*return (
        <Modal
            open={store.listMarkedForDeletion !== null}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                <header className="dialog-header">
                    Delete the {name} Playlist?
                </header>
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleDeleteList}
                    >Confirm</button>
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Cancel</button>
                </div>
            </div>
            </Box>
        </Modal>
    );*/
}