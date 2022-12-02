import { useContext, useState } from 'react';
import AuthContext from '../auth'
import Copyright from './Copyright'

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MUIRegisterErrorModal from './MUIRegisterErrorModal';

export default function RegisterScreen() {
    const { auth } = useContext(AuthContext);
    const [error, setError] = useState({error: false, errorMessage: ""})

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let fieldNames = ['userName', 'firstName', 'lastName', 'email', 'password', 'passwordVerify'];
        let fields = fieldNames.map(x => formData.get(x));
        
        //let firstName = formData.get('firstName');
        //let lastName = formData.get('lastName');
        //let email = formData.get('email');
        //let password = formData.get('password');
        //let passwordVerify = formData.get('passwordVerify');

        /*let success = auth.registerUser(
            firstName,
            lastName,
            email,
            password,
            passwordVerify
        );*/

        let success = await auth.registerUser(...fields);

        //console.log("It gets here at least");
        console.log(success);

        if(!(success.status)) {
            if(fields.reduce((current, next) => current || (next === ""), false)) {
                setError({error: true, errorMessage: "Please fill out all fields"});
            } else if(fields[4].length < 8) {
                setError({error: true, errorMessage: "Password must be at least 8 characters long"});
            } else if(fields[4] !== fields[5]) {
                setError({error: true, errorMessage: "Password must match verification"});
            } else if(success.message === "An account with this email address already exists.") {
                setError({error: true, errorMessage: success.message})
            } else {
                setError({error: true, errorMessage: success.message})
            }
        }
    };

    const handleCloseErrorModal = () => {
        setError({error: false, errorMessage: ""});
    }

    return (
            <Container component="main" maxWidth="xs">
                <MUIRegisterErrorModal isOpen={error.error} errorMessage={error.errorMessage} closeFunction={handleCloseErrorModal}/>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="userName"
                                    id="userName"
                                    label="User Name"
                                    autoFocus
                                    autoComplete='uname'
                                    />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordVerify"
                                    label="Password Verify"
                                    type="password"
                                    id="passwordVerify"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
    );
}