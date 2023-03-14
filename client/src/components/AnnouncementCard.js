import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import '../style/announcementCard.css'
import {useEffect, useState} from "react";
import {BASE_PATH} from "../util/Store";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function AnnouncementCard(props) {

    const {data}=props
    const [addedToFav, setAddedToFav] = useState(false);

    useEffect(()=>{
        const checkFavorite =async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                let token = user.token
                let userId = user.id
                try {
                    let request = await fetch(BASE_PATH+`announcement/favoriteCheck/${data.id}/${userId}`, {
                        headers: {Authorization: 'Bearer ' + token}
                    })
                    let result = await request.json();
                    setAddedToFav(result)
                } catch (e) {
                    console.log(e);
                }

            }
        }
        checkFavorite();
    },[])

    const viewAnnouncement = (e) => {
        window.location.replace(`/announcement/${e.currentTarget.id}`);
    }

    return (
        <Card className={"bigCard"} id={data.id}  sx={{ maxWidth: 700 }} style={{marginBottom:"3em", cursor:"pointer"}} onClick={viewAnnouncement}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {data.appUser.username[0].toUpperCase()}
                    </Avatar>
                }
                title={data.appUser.username}
                subheader={data.date.split("T")[0]}
            />
            <CardMedia
                component="img"
                height="350"
                image={data.images[0]}
            />
            <CardContent>
                <h3>{data.car.brand}</h3>
                <Typography variant="body2" color="text.secondary">
                        <FiberManualRecordIcon style={{maxWidth:"9px", maxHeight:"9px"}}/> {data.car.km} km &nbsp;
                        <FiberManualRecordIcon style={{maxWidth:"9px", maxHeight:"9px"}}/> {data.car.year} year &nbsp;
                        <FiberManualRecordIcon style={{maxWidth:"9px", maxHeight:"9px"}}/> {data.car.combustible}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {addedToFav?(
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                ):null}
                <h3 className={"priceCard"}>{data.price}€</h3>
                <VisibilityIcon style={{marginLeft:"2em", color:"gray", marginRight:"0.5em"}}/><p style={{color:"gray"}}>{Math.floor(data.views/2)}</p>
            </CardActions>
        </Card>
    );
}
