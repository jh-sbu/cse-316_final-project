import { Add, ArrowBack, ArrowForward, PlusOne } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import { useContext } from "react"
import PlaylistStoreContext from "../store/PlaylistStore"

export default function ListEditBar(props) {

    const { store } = useContext(PlaylistStoreContext);

    const handleUndoClick = (event) => {
        event.preventDefault();
        store.undo();
    }

    const handleRedoClick = (event) => {
        event.preventDefault();
        store.redo();
    }

    return (
        <Grid container direction={"row"}>
            <Grid item>
                <Button>
                    Publish
                </Button>
                <IconButton>
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