import { Grid, ListItem, Typography } from "@mui/material";
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";

export default function CommentCard(props) {

    const { store } = useContext(PlaylistStoreContext);

    const { comment, index } = props;

    console.log(index)

    return (
        <ListItem
            id = {'comment-' + index + '-card'}
            key={index}
            sx={{ marginTop: '15px', display: 'flex', p: 1, borderRadius: '10px', bgcolor: '#e1e4cb'}}
            style={{width: '100%', fontSize: '28pt'}}
        >
            <Grid container direction="column" alignItems={"flex-start"}>
                <Typography>
                    Hello! Username goes here!
                </Typography>
                <Typography>
                    Hello! Comment body goes here!
                </Typography>
            </Grid>
        </ListItem>
    )

}