import { Edit, Store } from "@mui/icons-material";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useContext, useState } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";

export default function EditableListTitle(props) {

    const [editing, setEditing] = useState(false);

    const playlist = props.playlist;

    const [error, setError] = useState(false);

    const { store } = useContext(PlaylistStoreContext);

    const handleClickEditPlaylistTitle = (event) => {
        event.stopPropagation();

        console.log("List name editing not implemented yet");

        setEditing(true);
    }

    const handleClickedNameField = (event) => {
        event.stopPropagation();
    }

    const handleSubmittedName = (event) => {
        event.stopPropagation();
        event.preventDefault();
        console.log("Tried to change name!");

        const formData = new FormData(event.currentTarget);

        const newName = formData.get("playlistName")

        if(store.playlists.find(x => x.ownerEmail === playlist.ownerEmail && x._id !== playlist._id && x.name === newName)) {
            setError(true);
        } else {
            setEditing(false);
            store.changeListName(playlist, newName);
        }
    }

    let helperText = "";

    if(error) {
        helperText = "You already have a list with that name!";
    }

    let listTitle = (
        <Grid container direction="row" alignItems={"flex-end"}>
            <Typography variant="h5">
                {playlist.name}
            </Typography>
            <IconButton onClick={handleClickEditPlaylistTitle}>
                <Edit />
            </IconButton>
        </Grid> )

    if(editing) {
        listTitle = (
            <Box component="form" onSubmit={handleSubmittedName}>
                <TextField 
                    defaultValue={playlist.name}
                    required
                    fullWidth
                    id="playlistName"
                    label="Playlist Name"
                    name="playlistName"
                    autoFocus
                    error={error}
                    helperText={helperText}
                    sx={{fontSize: '24pt'}}
                    onClick={handleClickedNameField}
                />
            </Box>
            
        )
    }
    

    return (
        <Fragment>
            {
                listTitle
            }
        </Fragment>
    )

}