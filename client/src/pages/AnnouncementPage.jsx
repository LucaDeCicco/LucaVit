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
import {BASE_PATH} from "../util/Store";


const AnnouncementPage = () => {
    const {id} = useParams();
    const [announcement, setAnnouncement] = useState();
    const [addedToFav, setAddedToFav] = useState(false);

    useEffect(() => {
        const checkFavorite = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                let token = user.token
                let userId = user.id
                try {
                    let request = await fetch(BASE_PATH + `announcement/favoriteCheck/${id}/${userId}`, {
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
                    let request = await fetch(BASE_PATH + `announcement/getById/${id}`, {
                        headers: {Authorization: 'Bearer ' + token}
                    })
                    let result = await request.json();
                    setAnnouncement(result)
                } catch (e) {
                    console.log(e);
                }

            }
        };
        checkFavorite();
        fetcher();
    }, [])

    const addToFav = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let token = user.token
            let userId = user.id
            if (!addedToFav) {
                try {
                    await fetch(BASE_PATH + `announcement/addToFavorites/${id}/${userId}`, {
                        method: "POST",
                        headers: {Authorization: 'Bearer ' + token}
                    })
                } catch (e) {
                    console.log(e);
                }
            } else {
                try {
                    await fetch(BASE_PATH + `announcement/removeFromFavorites/${id}/${userId}`, {
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
                <Button variant={"outlined"} style={{marginBottom: "1em"}} onClick={addToFav}>
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