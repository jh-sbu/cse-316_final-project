import { Box, Button, Grid, Icon, Menu, MenuItem, TextField } from "@mui/material"

import { House, People, Person } from "@mui/icons-material"
import ListerSortByList from "./ListerSortByList";
import { useContext } from "react";
import PlaylistStoreContext from "../store/PlaylistStore";
import AuthContext from "../auth";

export default function ListerTopBar(props) {

    const { store } = useContext(PlaylistStoreContext);

    const { auth } = useContext(AuthContext);

    const handleSearch = () => {
        console.log("Not implemented yet");
    }

    const handleHomeSearch = (event) => {
        event.preventDefault();
        console.log("Trying to view own lists");
        store.changeSearchMode("OWN_LISTS");
    }

    const handleUserSearch = (event) => {
        event.preventDefault();
        console.log("Trying to search by username");
        store.changeSearchMode("BY_USER");
    }

    const handleNameSearch = (event) => {
        event.preventDefault();
        console.log("Trying to search by playlist name");
        store.changeSearchMode("BY_NAME");
    }

    const handleEnteredSearchValue = (event) => {
        event.preventDefault();
        console.log("Entered value for search");
        const formData = new FormData(event.currentTarget);

        const searchVal = formData.get("searchString");

        store.changeSearchValue(searchVal);

        //console.log(formData);
        
    }

    return (
        <Grid container sx={{ mt: 3, mb: 2 }}>
            <Grid item xs={4}>
                <Button
                    type="button"
                    onClick={handleHomeSearch}
                >
                    <House />
                </Button>
                <Button
                    type="button"
                    onClick={handleUserSearch}
                >
                    <Person />
                </Button>
                <Button
                    type="button"
                    onClick={handleNameSearch}
                >
                    <People />
                </Button>
            </Grid>
            <Grid item xs={4}>
                <Box component="form" noValidate onSubmit={handleEnteredSearchValue}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="searchString"
                        label="Search"
                        name="searchString"
                    />
                </Box>
            </Grid>
            <Grid item xs={4} justifyContent="flex-end" alignItems={"flex-end"}>
                <ListerSortByList />
            </Grid>
        </Grid>
    )
}