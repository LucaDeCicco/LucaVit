import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import '../style/LoginCredentials.css';
import Button from '@mui/material/Button';
import {useState} from "react";
import axios from 'axios';
import {useAtom} from "jotai";
import {BASE_PATH, LOGGED_IN} from "../util/Store";
import {Alert, Stack} from "@mui/material";

const API_URL = BASE_PATH+"api/auth/";

export default function LoginCredentials() {


    const [loggedIn, setLoggedIn] = useAtom(LOGGED_IN);
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeUsername = event => {
        setUsername(event.target.value);
    };

    const handleChangePassword = event => {
        setPassword(event.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            loginUser();
        }
    };

    const loginUser = async () => {
        let response = null;
        try {
            response = await axios
                .post(API_URL + "signin", {
                    username,
                    password,
                });
                localStorage.setItem("user", JSON.stringify(response.data));
                setLoggedIn(true);
                window.location.replace("/");
        }
        catch (err){
            setIsVisible(true);
        }
    };

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField label="username" variant="standard" onChange={handleChangeUsername} onKeyDown={handleKeyDown} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="outlined-password-input" label="password" autoComplete="current-password" type="password" variant="standard" onChange={handleChangePassword} onKeyDown={handleKeyDown}/>
            </Box>
            <br/>
            <Button variant="contained" onClick={loginUser}>Login</Button>
            <br/>
            <br/>
            <h4><a href={"/forgotPassword"} className={"link"}> forgot password </a>|<a href={"/register"} className={"link"}> create account</a></h4>
            <br />
            <div id={"badCredentials"} style={{visibility: isVisible ? 'visible' : 'hidden'}}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="outlined" severity="error">
                        Username or password wrong — <a href={"/forgotPassword"}>You forgot your password ?</a>
                    </Alert>
                </Stack>
            </div>
        </Box>
    );
}