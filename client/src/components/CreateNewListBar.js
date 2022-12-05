import { Button } from "@mui/material";
import { useContext } from "react";
import GlobalStoreContext from "../store";


export default function CreateNewListBar(props) {
    const { store } = useContext(GlobalStoreContext)

    return (
        <Button>
            Add List
        </Button>
    )
}