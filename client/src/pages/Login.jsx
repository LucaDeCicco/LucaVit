import React from 'react';
import '../style/LoginForm.css'
import LoginCredentials from "../components/LoginCredentials";
import {useAtom} from "jotai";
import {LOGGED_IN} from "../util/Store";
import Loading from "../components/Loading";

const Login = () => {
    const [loggedIn, setLoggedIn] = useAtom(LOGGED_IN);

    if (loggedIn==="true"){
        window.location.replace("/")
    }
    return (
        <>
            {loggedIn ? (
                <Loading />
            ):(
                <div className={"form"}>
                    <div className="parent-login-form">
                        <div className="div1-login-form">
                            <LoginCredentials />
                        </div>
                        <div className="div2-login-form"><img alt={"loginImg"} className={"loginImg"} src={"https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1676292733~exp=1676293333~hmac=4e7f8f363fdd9389b4fd18f39f43d281e0cbda4ee5712c89117bf45958e28782"}/></div>
                    </div>
                </div>
            )}
        </>

    )
};

export default Login;