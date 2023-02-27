import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import '../style/LoginCredentials.css';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import axios from 'axios';
import {useAtom} from "jotai";
import {BASE_PATH, LOGGED_IN} from "../util/Store";

const API_URL = BASE_PATH + "api/auth/";

export default function RegisterCredentials() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userNames, setUserNames] = useState([]);
    const [emails, setEmails] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loggedIn, setLoggedIn] = useAtom(LOGGED_IN);


    useEffect(() => {
        const fetcherUsernames = async () => {
            try {
                let request = await fetch(BASE_PATH + `user/getAllUsernames`)
                let result = await request.json();
                setUserNames(result);
            } catch (e) {
                console.log(e);
            }

        };
        const fetcherEmails = async () => {
            try {
                let request = await fetch(BASE_PATH + `user/getAllEmails`)
                let result = await request.json();
                setEmails(result);
            } catch (e) {
                console.log(e);
            }

        };
        fetcherUsernames();
        fetcherEmails();
    }, [])

    useEffect( () => {
        while (true){
            if (email.length>0){
                let sameEmail = false;
                for (let email1 of emails) {
                    if (email1===email){
                        sameEmail = true;
                    }
                }
                if (sameEmail){
                    setErrorMessage("This email is used");
                    break;
                }
                else {
                    setErrorMessage("");
                }
            }
            if (username.length>0){
                let sameUserName = false;
                for (let userName of userNames) {
                    if (userName===username){
                        console.log("username true")
                        sameUserName = true;
                    }
                }
                if (sameUserName){
                    setErrorMessage("This username is used");
                    break;
                }
                else {
                    setErrorMessage("");
                }
            }
            if (password.length>0){
                if (password.length<6){
                    setErrorMessage("The password must contain at least 6 characters");
                    break;
                }
                else {
                    setErrorMessage("");
                }
            }
            break;
        }
    },[email, username, password])

    const handleChangeUsername = event => {
        setUsername(event.target.value);
    };

    const handleChangePassword = event => {
        setPassword(event.target.value);
    };

    const handleChangeEmail = event => {
        setEmail(event.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addUser();
        }
    };

    const validateEmail = () => {
        if (!email.includes("@")) {
            setErrorMessage(["The email must contain \"@\""])
            return false;
        }
        if (email.split("@")[1] === "") {
            setErrorMessage(["The email must have a correct format"])
            return false;
        }
        return true;
    }

    const addUser = async () => {
        if (validateEmail()) {
            try {
                await axios.post(API_URL + "signup", {
                    email,
                    username,
                    password,
                    role: ["ROLE_USER"]
                });
                const loginResponse = await axios
                    .post(API_URL + "signin", {
                        username,
                        password,
                    });
                localStorage.setItem("user", JSON.stringify(loginResponse.data));
                setLoggedIn(true);
                window.location.replace("/");
            } catch (e) {
                console.log(e);
            }
        }

    }

    return (
        <Box sx={{'& > :not(style)': {m: 1}}}>
            <label style={{color: "red"}}>{errorMessage}</label>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                <TextField id="input-with-sx email" label="email" variant="standard" onChange={handleChangeEmail}
                           onKeyDown={handleKeyDown}/>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                <TextField label="username" variant="standard" onChange={handleChangeUsername}
                           onKeyDown={handleKeyDown}/>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                <KeyIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                <TextField id="outlined-password-input" label="password" autoComplete="current-password" type="password"
                           variant="standard" onChange={handleChangePassword} onKeyDown={handleKeyDown}/>
            </Box>
            <br/>
            <Button variant="contained" onClick={addUser}>Register</Button>
            <br/>
            <br/>
        </Box>
    );
}