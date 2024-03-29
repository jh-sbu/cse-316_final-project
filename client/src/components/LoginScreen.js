import { useContext, useState } from 'react';
import AuthContext from '../auth'

import Copyright from './Copyright'

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import backgroundImg from '../photo-1664773971401-fe3e4351425e.jpg'
import MUILoginErrorModal from './MUILoginErrorModal';

export default function LoginScreen() {
    const { auth } = useContext(AuthContext);
    const [ error, setError ] = useState({error: false, errorMessage: ""});

    const handleSubmit2 = (event) => {
        event.preventDefault();

        setError(true);
    }

    const closeErrorModal = () => {
        setError({error: false, errorMessage: ""});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let success = await auth.loginUser(
            formData.get('email'),
            formData.get('password')
        );

        //console.log(success);

        if(!success) {
            if(formData.get('email') === "" || formData.get('password') === "") {
                setError({error: true, errorMessage: "Please enter your username and password"})
            } else {
                setError({error: true, errorMessage: "Wrong username or password"});
            }
        }
    };

    return (
        <Grid container component="main" sx={{ height: '85vh' }}>
            <MUILoginErrorModal isOpen={error.error} errorMessage={error.errorMessage} closeFunction={closeErrorModal}/>
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            {/*<Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>*/}
                            <Grid item>
                                <Link href="/register/" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}