import { Grid, ListItem, Typography, Button } from "@mui/material";
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";

export default function CommentCard(props) {

    const { store } = useContext(PlaylistStoreContext);

    const { comment, index } = props;

    const clickName = (event) => {
        event.stopPropagation();
        store.changeSearchAndValue("BY_USER", comment.userName)
    }

    //console.log(index)

    return (
        <ListItem
            id = {'comment-' + index + '-card'}
            key={index}
            sx={{ marginTop: '5px', display: 'flex', p: 1, borderRadius: '10px', bgcolor: '#e1e4cb', width: '100%'}}
            style={{width: '100%', fontSize: '28pt'}}
        >
            <Grid container direction="column" alignItems={"flex-start"}>
                <Button onClick={clickName}>
                    {comment.userName}
                </Button>
                <Typography sx={{width: '100%', overflow: "scroll"}}>
                    {comment.comment}
                </Typography>
            </Grid>
        </ListItem>
    )

}