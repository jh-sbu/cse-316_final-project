import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { useHistory } from 'react-router-dom';
import { PlaylistStoreContextProvider } from '../store/PlaylistStore';

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    //console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);

    const history = useHistory();
    
    if (auth.loggedIn) {
        history.push("/home");
        //return <HomeScreen />
        return null;
    }

    return (
        <PlaylistStoreContextProvider>
            <SplashScreen />
        </PlaylistStoreContextProvider>
    )
}