import React, {useEffect, useRef, useState} from 'react';
import IndexModal from "../components/IndexModal";
import {useAtom} from "jotai";
import {LOGGED_IN} from "../util/Store";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../style/mainPage.css';
import AnnouncementList from "../components/AnnouncementList";
import Button from "@mui/material/Button";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MainPageVideo from "../components/MainPageVideo";
import {getTokenExpirationDate} from "../util/Service";

const MainPage = () => {

    const [loggedIn, setLoggedIn] = useAtom(LOGGED_IN);
    const [scroll, setScroll] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const showAllBtnStyle = {
        position: scrollPosition >= 470 ? "fixed" : "static",
        left: "663px",
        top: "70px",
    };

    const indexModalStyle = {
        marginBottom: scrollPosition >= 480 ? "7em" : "0em"
    }

    function setupTokenExpirationChecking() {
        const user = JSON.parse(localStorage.getItem('user'));
        let token = null
        if (user) {
            token = user.token
        }
        console.log(token);
        if (!token) {
            return false;
        }
        const expirationDate = getTokenExpirationDate(token);
        if (!expirationDate) {
            return false;
        }
        if (new Date() >= expirationDate) {
            localStorage.removeItem('user');
            localStorage.removeItem('loggedIn');
            return false;
        }
        return true;
    }

    useEffect(() => {
        let expirationChecking = true;
        const intervalId = setInterval(() => {
            expirationChecking = setupTokenExpirationChecking();
            console.log("aaa:" + expirationChecking);
            if (!expirationChecking) {
                clearInterval(intervalId);
                console.log("Interval cleared");
                window.location.replace("/login")
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {

        function handleScroll() {
            const position = window.scrollY;
            setScrollPosition(position);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleShowAllBtn = () => {
        if (!loggedIn) {
            window.location.replace("/login")
        }
        setScroll(!scroll);
    }
    return (
        <div>
            <h2 className={"mainPageTitle"} style={{marginLeft: "4em", color: "rgba(0,0,0,0.6)"}}>Find your dream
                car</h2>
            <div style={indexModalStyle}>
                <IndexModal/>
            </div>
            <div style={showAllBtnStyle}>
                <Button
                    variant="contained"
                    className={"showAllBtn"}
                    onClick={handleShowAllBtn}
                >
                    {scroll ? (
                        <>
                            <KeyboardArrowUpIcon style={{marginTop: "2px"}}/>
                        </>

                    ) : (
                        <>
                            <div>show all</div>
                            <ExpandMoreIcon style={{marginLeft: "1em", marginTop: "2px"}}/>
                        </>

                    )}
                </Button>
            </div>
            {!scroll ? null : <AnnouncementList/>}
            <MainPageVideo/>
        </div>
    )
};

export default MainPage;