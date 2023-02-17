import React from 'react';
import IndexModal from "../components/IndexModal";
import {useAtom} from "jotai";
import {LOGGED_IN} from "../util/Store";

const MainPage = () => {

    const [loggedIn, setLoggedIn] = useAtom(LOGGED_IN);

    return (
        <div>
            {loggedIn ? (<h1>LoggedIn</h1>):(<h1>false</h1>)}
            <h1></h1>
            <IndexModal />
        </div>
    )
};

export default MainPage;