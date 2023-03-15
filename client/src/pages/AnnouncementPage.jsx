import React, {useEffect, useState} from 'react';
import PhotoContainer from "../components/PhotoContainer";
import {useParams} from "react-router-dom";
import Loading from "../components/Loading";
import AnnouncementVideo from "../components/AnnouncementVideo";
import {Paper} from "@mui/material";
import '../style/AnnouncementPage.css';
import AnnouncementPageDetails from "../components/AnnouncementPageDetails";
import ContactCard from "../components/ContactCard";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';



const AnnouncementPage = () => {
    const {id} = useParams();
    const backend = process.env.REACT_APP_BACKEND;
    const [announcement, setAnnouncement] = useState();
    const [addedToFav, setAddedToFav] = useState(false);

    useEffect(() => {
        console.log("de cate ori")
        console.log("ceva")
        checkFavorite();
        fetcher();
    },[])

    const checkFavorite = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let token = user.token
            let userId = user.id
            try {
                let request = await fetch(backend + `announcement/favoriteCheck/${id}/${userId}`, {
                    headers: {Authorization: 'Bearer ' + token}
                })
                let result = await request.json();
                setAddedToFav(result)
            } catch (e) {
                console.log(e);
            }

        }
    }

    const fetcher = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let token = user.token
            try {
                let request = await fetch(backend + `announcement/getById/${id}`, {
                    headers: {Authorization: 'Bearer ' + token}
                })
                let result = await request.json();
                setAnnouncement(result)
            } catch (e) {
                console.log(e);
            }

        }
    };

    const addToFav = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let token = user.token
            let userId = user.id
            if (!addedToFav) {
                try {
                    await fetch(backend + `announcement/addToFavorites/${id}/${userId}`, {
                        method: "POST",
                        headers: {Authorization: 'Bearer ' + token}
                    })
                } catch (e) {
                    console.log(e);
                }
            } else {
                try {
                    await fetch(backend + `announcement/removeFromFavorites/${id}/${userId}`, {
                        method: "POST",
                        headers: {Authorization: 'Bearer ' + token}
                    })
                } catch (e) {
                    console.log(e);
                }
            }
        }
        setAddedToFav(!addedToFav);
    }

    return (
        <>
            <AnnouncementVideo/>
            <div>
                <Paper className={"announcementPrice"}>
                    <h2 style={{marginLeft: "2em"}}>{announcement?.price} €</h2>
                </Paper>
                <Button variant={"outlined"} style={{marginBottom: "1em", verticalAlign:"middle", alignItems:"center"}} onClick={addToFav}>
                    {addedToFav ? (
                        <>
                            <FavoriteIcon/>
                            Remove from Favorites
                        </>

                    ) : (
                        <>
                            <FavoriteBorderIcon/>
                            &nbsp;&nbsp;Add To Favorites
                        </>
                    )}
                </Button>
                <div className="views">
                <VisibilityIcon className="viewsIcon"/>
                <p className="viewsNumber">{Math.floor(announcement.views/2)}</p>
                </div>
                {announcement ? <PhotoContainer data={announcement.images}/> : <Loading/>}
                <AnnouncementPageDetails data={announcement}/>
                <Paper className={"description"} elevation={24}>
                    {announcement?.description}
                </Paper>
                <div className={"contactCard"}>
                    <ContactCard data={announcement}/>
                </div>
            </div>
        </>

    )
};

export default AnnouncementPage;