import { Box, Grid, TextField } from "@mui/material";
import { Fragment, useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";
import CommentList from "./CommentList";

export default function CommentBox(props) {

    const { store } = useContext(PlaylistStoreContext);

    const handleSubmitComment = (event) => {
        event.preventDefault();
        //console.log("Submitting a comment not implemented yet!");

        const formData = new FormData(event.currentTarget);

        const commentVal = formData.get("commentField");

        console.log("Comment: ");
        console.log(commentVal);

        store.makeComment(commentVal, store.playingList)
    }

    let formBox = ""

    if(store.playingList && store.playingList.published) {
        formBox = (
            <Box component="form" noValidate onSubmit={handleSubmitComment}>
                <TextField
                    margin="normal"
                    fullWidth
                    id="commentField"
                    label="Comment"
                    name="commentField"
                />
            </Box>
        )
    }

    //<Grid container direction="column" sx={{height: '10%', width: '100%'}} alignItems={'flex-start'}>

    return (
        <Fragment>
            <Grid item xs={9} container sx={{height: '100%', width: '100%', overflow: 'scroll'}}>
                <CommentList />
            </Grid>
            <Grid item xs={3}>
                {formBox}
            </Grid>
        </Fragment>
    )

}