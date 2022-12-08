import { Add, ArrowBack, ArrowForward, PlusOne } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import { useContext } from "react"
import PlaylistStoreContext from "../store/PlaylistStore"

export default function ListEditBar(props) {

    const { store } = useContext(PlaylistStoreContext);

    const handleUndoClick = (event) => {
        event.stopPropagation();
        store.undo();
    }

    const handleRedoClick = (event) => {
        event.stopPropagation();
        store.redo();
    }

    const handleAddSong = (event) => {
        event.stopPropagation();
        store.addNewSong();
    }

    const handlePublish = (event) => {
        event.stopPropagation();
        store.publishCurrentList();
    }

    return (
        <Grid container direction={"row"}>
            <Grid item>
                <Button onClick={handlePublish} variant="contained">
                    Publish
                </Button>
                <IconButton onClick={handleAddSong}>
                    <Add />
                </IconButton>
                <IconButton variant="contained" disabled={!store.canUndo()} onClick={handleUndoClick}>
                    <ArrowBack />
                </IconButton>
                <IconButton variant="contained" disabled={!store.canRedo()} onClick={handleRedoClick}>
                    <ArrowForward />
                </IconButton>
            </Grid>
        </Grid>
    )

}