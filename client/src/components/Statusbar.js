import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { AppBar, Typography } from '@mui/material'
import { Box } from '@mui/material';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="";
    if (store.currentList)
        text = store.currentList.name;

    let handleKeyPress = (event) => {
        //event.preventDefault();
        //console.log("You pressed a key!");
        store.handleKeyPress(event);
    }

    return (
        <Box sx={{flexgrow: 1}} onKeyDown={handleKeyPress} tabIndex={-1}>
            <AppBar position="fixed" sx={{top:"90%", width: "80%", left: "10%", display: "flex", alignItems: "center"}}>
                <div id="playlister-statusbar">
                    <Typography variant="h4">{text}</Typography>
                </div>
            </AppBar>
        </Box>
    );
}

export default Statusbar;