import React, {useEffect, useRef, useState} from 'react';
import IndexModal from "../components/IndexModal";
import {useAtom} from "jotai";
import {LOGGED_IN, RE_RENDER} from "../util/Store";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../style/mainPage.css';
import AnnouncementList from "../components/AnnouncementList";
import Button from "@mui/material/Button";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MainPageVideo from "../components/MainPageVideo";
import {checkLogin} from "../util/Service";

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


    useEffect(() => {
        // checkLogin(loggedIn, setLoggedIn);
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