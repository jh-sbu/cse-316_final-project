import { Box, Grid, List, Typography } from "@mui/material";
import { Fragment, useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";
import CommentCard from "./CommentCard";

export default function CommentList(props) {

    const { store } = useContext(PlaylistStoreContext);

    let commentList = "Play a list to see its comments!";

    console.log("It gets here");

    if(true || store.playingList) {
        commentList = (
            <List sx={{ height: '100%'}}>
                {
                    store.openedList.comments.map((song, index) => {
                        console.log("In the loop");
                        return (
                            <CommentCard comment={song} index={index} key={index} />
                        )
                    })
                }
            </List>
        )
    }

    //console.log(commentList);

    return (
        <Box sx={{height: "100%", overflow: "scroll"}}>
            {
                commentList
            }
        </Box>
    )

}