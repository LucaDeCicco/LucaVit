import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import '../style/LoginCredentials.css';
import Button from '@mui/material/Button';

export default function LoginCredentials() {
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="username" variant="standard" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="outlined-password-input" label="password" autoComplete="current-password" type="password" variant="standard" />
            </Box>
            <br/>
            <Button variant="contained">Login</Button>
            <br/>
            <br/>
            <h4><a href={"/forgotPassword"} className={"link"}> forgot password </a>|<a href={"/register"} className={"link"}> create account</a></h4>
        </Box>
    );
}