import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import '../style/LoginCredentials.css';
import Button from '@mui/material/Button';
import {useState} from "react";
import axios from 'axios';

const API_URL = "http://localhost:8888/api/auth/";

export default function LoginCredentials() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeUsername = event => {
        setUsername(event.target.value);
    };

    const handleChangePassword = event => {
        setPassword(event.target.value);
    };

    const loginUser = async () => {
        let response = null;
        try {
            response = await axios
                .post(API_URL + "signin", {
                    username,
                    password,
                });
        }
        catch (err){
            // setIsVisible(current => !current);
        }

        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
            // sessionStorage
            window.location.replace("/");
        }
        return response.data;
    };
    console.log(loginUser())

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="username" variant="standard" onChange={handleChangeUsername} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="outlined-password-input" label="password" autoComplete="current-password" type="password" variant="standard" onChange={handleChangePassword}/>
            </Box>
            <br/>
            <Button variant="contained" onClick={loginUser}>Login</Button>
            <br/>
            <br/>
            <h4><a href={"/forgotPassword"} className={"link"}> forgot password </a>|<a href={"/register"} className={"link"}> create account</a></h4>
        </Box>
    );
}