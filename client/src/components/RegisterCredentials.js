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

export default function     RegisterCredentials() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const handleChangeUsername = event => {
        setUsername(event.target.value);
    };

    const handleChangePassword = event => {
        setPassword(event.target.value);
    };

    const handleChangeEmail = event => {
        setEmail(event.target.value);
        // let sameEmail = false;
        // for (let email of emails) {
        //     if (email.toLowerCase()===event.target.value.toLowerCase()){
        //         sameEmail = true;
        //     }
        // }
        // if (sameEmail){
        //     setErrorMessage("This email is used")
        // }
        // else {
        //     setErrorMessage("")
        // }
    };

    const addUser = async () => {
        // validateEmail()
        console.log("inainte de rsponse");
        console.log(email);
        console.log(username);
        console.log(password);
        const signUpRequest = {
            email: email,
            username: username,
            password: password,
            role: ["ROLE_USER"]
        }
        // let response = await axios.post(API_URL + "signup", {
        //     email,
        //     username,
        //     password,
        //     role: ["ROLE_USER"]
        // });
        let response = await axios.post(API_URL + "signup", {
            body:JSON.stringify(signUpRequest)
        });
        console.log("response")
        console.log(response)
        if (response) {
            // await axios.post("http://localhost:8888/util/registerSendMail",{
            //     // email,
            //     username
            // });
            // let username = name
            const loginResponse = await axios
                .post(API_URL + "signin", {
                    username,
                    password,
                });
            if (loginResponse.data.token) {
                localStorage.setItem("user", JSON.stringify(loginResponse.data));
                window.location.replace("/");
            }
        }
    }

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="email" variant="standard" onChange={handleChangeEmail} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="username" variant="standard" onChange={handleChangeUsername} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="outlined-password-input" label="password" autoComplete="current-password" type="password" variant="standard" onChange={handleChangePassword}/>
            </Box>
            <br/>
            <Button variant="contained" onClick={addUser}>Register</Button>
            <br/>
            <br/>
            <h4><a href={"/forgotPassword"} className={"link"}> forgot password </a>|<a href={"/register"} className={"link"}> create account</a></h4>
        </Box>
    );
}