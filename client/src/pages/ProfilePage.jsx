import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import '../style/ProfilePage.css'
import Button from "@mui/material/Button";
import AnnouncementList from "../components/AnnouncementList";

const ProfilePage = () => {
    const {username} = useParams();
    const [content, setContent] = useState("MY ANNOUNCEMENTS");
    const contentTypes = ["MY ANNOUNCEMENTS", "FAVORITES", "MESSAGES", "SETTINGS"]

    const changeContent=(event)=>{
        setContent(event.target.valueOf().innerText);
    }

    return (
        <div>
            <div className={"profileNavBar"}>
                {contentTypes.map(item => (
                    content === item ? (
                        <Button key={item} variant={"contained"} disabled={true} className={"mainButtons"} >{item}</Button>
                    ):(
                        <Button key={item} variant={"contained"} style={{boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)"}} className={"mainButtons"} onClick={changeContent}>{item}</Button>
                    )
                ))}
            </div>
            <div className={"content"}>
                <h2>Hello {username}</h2>
                <h3>{content}</h3>
                {content==="FAVORITES"?(
                    <AnnouncementList type={"profilePageFavorite"} />
                ):null}
                {content==="MY ANNOUNCEMENTS"?(
                    <AnnouncementList type={"profilePageMyAnnouncements"} />
                ):null}
            </div>
        </div>
    )
};

export default ProfilePage;