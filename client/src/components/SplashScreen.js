import { Box, Button, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import PlaylisterLogo from "../PlaylisterLogo.png"

export default function SplashScreen() {
    const history = useHistory();
    return (
        <Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Typography>
                            Welcome to
                        </Typography>
                        <Box
                            component="img"
                            sx={{
                                height: 194,
                                width: 552,
                                maxHeight: { xs: 194, md: 97 },
                                maxWidth: { xs: 552, md: 276 },
                            }}
                            alt="Playlister Logo" 
                            src={PlaylisterLogo}
                        />
                    </Box>
            </Grid>
            <Grid container justifyContent="center" sx={{mt: 40}}>
                <Grid item xs={4}>
                    <Button 
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2}}
                        onClick={() => history.push("/login")}
                    >
                        Login
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => history.push("/register")}
                    >
                        Register
                    </Button>
                </Grid>
                
                
                <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Continue as Guest
                </Button>
            </Grid>
            <Grid item justifyContent="center" justifyItems="center" sx={{mt: 2}}>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Typography>
                        A playlisting and sharing app created by Joseph Hess at Stony Brook University
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}