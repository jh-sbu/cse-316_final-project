import { Button, Grid, Typography } from "@mui/material";
import { useContext } from "react"
import PlaylistStoreContext from "../store/PlaylistStore"

const MonthDict = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

export default function PublishedListBottomBar(props) {

    const { store } = useContext(PlaylistStoreContext);

    const playlist = props.playlist;

    const date = new Date(playlist.publishDate);

    const dateString = String(date.getDate()) + " " + MonthDict[date.getMonth()] + " " + String(date.getFullYear());

    return (
        <Grid container direction={"row"}>
            <Grid item xs={8}>
                <Typography>
                    Published: {dateString}
                </Typography>
            </Grid>
            <Grid item xs={4} container justifyContent={"flex-end"}>
                <Typography>
                    Listens: {playlist.listens}
                </Typography>
            </Grid>
        </Grid>
    )
}