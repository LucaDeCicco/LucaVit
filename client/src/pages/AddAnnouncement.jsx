import React, {useEffect} from 'react';
import {useAtom} from "jotai";
import {LOGGED_IN} from "../util/Store";
import Loading from "../components/Loading";

const AddAnnouncement = () => {

    const [loggedIn, setLoggedIn] = useAtom(LOGGED_IN);


    useEffect( () => {
        if (loggedIn==="false"){
            window.location.replace("/login")
        }
    },[])

    return (
        <>
            {loggedIn ? (
                <div>
                    Add product
                </div>
            ) : (
                <div style={{position:"absolute", left:"47%", top:"100px"}}>
                    <Loading />
                </div>
            )}
        </>

    )
};

export default AddAnnouncement;