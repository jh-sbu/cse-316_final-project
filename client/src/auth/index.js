import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState(window.sessionStorage.getItem('authStatus') ? JSON.parse(window.sessionStorage.getItem('authStatus')) : {
    //const [auth, setAuth] = useState( {
        user: null,
        loggedIn: false
    });
    const history = useHistory();

    //console.log("storage thing is " + (typeof window.sessionStorage.getItem('authStatus')));

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    useEffect(() => {
        window.sessionStorage.setItem('authStatus', JSON.stringify(auth));
    }, [auth]);

    const authReducer = (action) => {
        const { type, payload } = action;
        //console.log(payload);
        //console.log(payload.user)
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            default:
                return auth;
        }
    }

    /*auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }*/

    auth.getLoggedIn = async () => {
        await api.getLoggedIn().then((response) => {
            if(response.status === 200) {
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                })
            }
        }).catch(err => {
            console.log(err);
            return false;
        })

        return true;
    }

    /*auth.registerUser = async function(firstName, lastName, email, password, passwordVerify) {
        const response = await api.registerUser(firstName, lastName, email, password, passwordVerify);      
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            //history.push("/login");
            history.push("/");
        }
    }*/

    auth.registerUser = async (userName, firstName, lastName, email, password, passwordVerify) => {
        let success = {status: true, message: ""};

        await api.registerUser(userName, firstName, lastName, email, password, passwordVerify).then((response) => {
            //console.log("Made it here");
            if(response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        }).catch(err => {
            //console.log(err.message.response.data.errorMessage)
            success = {status: false, message: err.response.data.errorMessage};
        })

        return success;
    }

    auth.loginUser = async (email, password) => {

        let success = true;

        await api.loginUser(email, password).then( (response) => {
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
            }
            history.push("/");
        }).catch(err => {
            console.log(err);
            success = false;
        })

        return success;
    }

    /*auth.loginUserOld = async function(email, password) {
        const response = await api.loginUser(email, password);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        }
    }*/

    auth.logoutUser = async () => {
        await api.logoutUser().then((response) => {
            if(response.status === 200) {
                authReducer( {
                    type: AuthActionType.LOGOUT_USER,
                    payload: null
                })
                //history.push("/");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    /*auth.logoutUserOld = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }*/

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        //console.log("user initials: " + initials);
        return initials;
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };