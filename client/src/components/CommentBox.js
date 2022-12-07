import { Box, Grid, TextField } from "@mui/material";
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";
import CommentList from "./CommentList";

export default function CommentBox(props) {

    const { store } = useContext(PlaylistStoreContext);

    const handleSubmitComment = (event) => {
        event.preventDefault();
        console.log("Submitting a comment not implemented yet!");
    }

    return (
        <Grid container direction="column" sx={{height: '50%', width: '100%'}} alignItems={'flex-start'}>
            <Grid item xs={9} container sx={{height: '70%'}}>
                <CommentList />
            </Grid>
            <Grid item xs={3}>
                <Box component="form" noValidate onSubmit={handleSubmitComment}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="commentField"
                        label="Comment"
                        name="commentField"
                    />
                </Box>
            </Grid>
        </Grid>
    )

}