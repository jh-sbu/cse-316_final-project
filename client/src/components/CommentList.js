import { Box, Grid, List, Typography } from "@mui/material";
import { Fragment, useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";
import CommentCard from "./CommentCard";

export default function CommentList(props) {

    const { store } = useContext(PlaylistStoreContext);

    let commentList = (
        <Typography>
            Play a list to see its comments!
        </Typography>
    )
    
    console.log("It gets here");

    if(store.playingList) {
        if(store.playingList.published) {
            commentList = (
                <List sx={{ height: '100%', flexDirection: 'row'}}>
                    {
                        store.playingList.comments.map((song, index) => {
                            console.log("In the loop");
                            return (
                                <CommentCard comment={song} index={index} key={index} />
                            )
                        })
                    }
                </List>
                
            )
        } else {
            commentList = (
                <Typography>
                    You can only comment on a published list!
                </Typography>
            )
        }
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