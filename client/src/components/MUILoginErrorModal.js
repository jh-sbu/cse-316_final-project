import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Alert, AlertTitle, Button, Grid, Typography } from '@mui/material';

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
    flexDirection: 'column'
};

export default function MUILoginErrorModal(props) {

    let handleCloseErrorModal = () => {
        props.closeFunction();
    }

    //console.log(props);

    return (
        <Modal open={props.isOpen}>
            <Box sw={style}>
                <Grid sx={style} container spacing={2}>
                    <Alert xs={12} severity='error'>
                        <AlertTitle>Bad Login</AlertTitle>
                        {props.errorMessage}
                    </Alert>
                    <Button sx={{}} onClick={handleCloseErrorModal}>
                        Close
                    </Button>
                </Grid>
            </Box>
        </Modal>
    )

}