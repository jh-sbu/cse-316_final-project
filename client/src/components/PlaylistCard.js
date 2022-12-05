import { Typography } from "@mui/material"
import PlaylistCardClosed from "./PlaylistCardClosed";

export default function PlaylistCard(props) {
    // Needs two props from parent - 'open': bool and the actual card

    const {playlist, open} = props;

    let CardToDisplay = open ?
        <Typography>
            Not implemented yet!
        </Typography>
        : <PlaylistCardClosed playlist={playlist} />
    

    return (
        CardToDisplay
    )
}