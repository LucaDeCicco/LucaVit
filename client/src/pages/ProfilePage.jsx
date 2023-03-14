import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import '../style/ProfilePage.css'
import Button from "@mui/material/Button";
import AnnouncementList from "../components/AnnouncementList";

import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';

const ProfilePage = () => {
    const {username} = useParams();
    const [content, setContent] = useState("MY ANNOUNCEMENTS");
    const contentTypes = ["MY ANNOUNCEMENTS", "FAVORITES", "MESSAGES", "SETTINGS"]

    const changeContent = (event) => {
        setContent(event.target.valueOf().innerText);
    }

    const goMyAnnouncements =()=> {
        setContent("MY ANNOUNCEMENTS")
    }

    const goFavorites =()=> {
        setContent("FAVORITES")
    }

    const goMessages =()=> {
        setContent("MESSAGES")
    }

    const goSettings =()=> {
        setContent("SETTINGS")
    }

    return (
        <div>
            <div className={"profileNavBar"}>
                {contentTypes.map(item => (
                    content === item ? (
                        <Button key={item} variant={"contained"} disabled={true}
                                className={"mainButtons"}>{item}</Button>
                    ) : (
                        <Button key={item} variant={"contained"} style={{boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)"}}
                                className={"mainButtons"} onClick={changeContent}>{item}</Button>
                    )
                ))}
                <div className="smallProfileButtons">
                    {contentTypes.map(item => (
                        content === item ? (
                            <b key={item}
                               className={"mainSmallButtons"}>{item}</b>
                        ) : (
                            <b key={item} style={{boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)"}}
                               className={"mainSelectedSmallButtons"} onClick={changeContent}>{item}</b>
                        )
                    ))}
                </div>
                <div className="iconsProfileButtons">
                    {contentTypes.map(item => (
                        content === item ? (
                            item === "MY ANNOUNCEMENTS" ? (<ChromeReaderModeIcon key={item} className="mainSelectedProfileIcons"/>) :
                                item === "FAVORITES" ? (<FavoriteIcon key={item} className="mainSelectedProfileIcons"/>) :
                                    item === "MESSAGES" ? (<MessageIcon key={item} className="mainSelectedProfileIcons"/>) :
                                        item === "SETTINGS" ? (<SettingsIcon key={item} className="mainSelectedProfileIcons"/>) : null
                        ) : (
                            item === "MY ANNOUNCEMENTS" ? (<ChromeReaderModeIcon key={item} className="mainProfileIcons" onClick={goMyAnnouncements}/>) :
                                item === "FAVORITES" ? (<FavoriteIcon key={item} className="mainProfileIcons" onClick={goFavorites}/>) :
                                    item === "MESSAGES" ? (<MessageIcon key={item} className="mainProfileIcons" onClick={goMessages}/>) :
                                        item === "SETTINGS" ? (<SettingsIcon key={item} className="mainProfileIcons" onClick={goSettings}/>) : null
                        )
                    ))}
                </div>
            </div>
            <div className={"content"}>
                <div className="contentTitle">{content}</div>
                {content === "FAVORITES" ? (
                    <AnnouncementList type={"profilePageFavorite"}/>
                ) : null}
                {content === "MY ANNOUNCEMENTS" ? (
                    <AnnouncementList type={"profilePageMyAnnouncements"}/>
                ) : null}
            </div>
        </div>
    )
};

export default ProfilePage;