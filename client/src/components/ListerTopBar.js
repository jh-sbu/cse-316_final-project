import { Box, Button, Grid, Icon, Menu, MenuItem, TextField } from "@mui/material"

import { House, People, Person } from "@mui/icons-material"
import ListerSortByList from "./ListerSortByList";

export default function ListerTopBar(props) {

    const handleSearch = () => {
        console.log("Not implemented yet");
    }

    return (
        <Grid container sx={{ mt: 3, mb: 2 }}>
            <Grid item xs={4}>
                <Button
                    type="button"
                    onClick={() => console.log("Not implemented")}
                >
                    <House />
                </Button>
                <Button
                    type="button"
                    onClick={() => console.log("Not Implemented")}
                >
                    <Person />
                </Button>
                <Button
                    type="button"
                    onClick={() => console.log("Not Implemented")}
                >
                    <People />
                </Button>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    margin="normal"
                    fullWidth
                    id="searchString"
                    label="Search"
                    name="searchString"
                />
            </Grid>
            <Grid item xs={4} justifyContent="flex-end" alignItems={"flex-end"}>
                <ListerSortByList />
            </Grid>
        </Grid>
    )
}