import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {FILTER_STORE} from "../util/Store";
import AnnouncementCard from "./AnnouncementCard";
import '../style/infiniteScroll.css'
import {useAtom} from "jotai";


export default function AnnouncementList(props) {

    const backend = process.env.REACT_APP_BACKEND;
    const [data, setData] = useState([]);
    const [announcementCrt, setAnnouncementCrt] = useState(1);
    const [filters] = useAtom(FILTER_STORE);
    const {type} = props;

    useEffect(()=>{
        window.scrollBy(0, 100);
        window.scrollBy(0,-100);
    },[])


    const loadData = async () => {
        if (type==="filter"){
            try {
                let response = await fetch(backend+`announcement/filter/${announcementCrt}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        bodyType:filters.bodyType,
                        brand:filters.brand,
                        gearBoxType:filters.gearBox,
                        fuel:filters.fuel,
                        minYear:filters.minYear,
                        maxYear:filters.maxYear,
                        minKm:filters.minKm,
                        maxKm:filters.maxKm,
                        minPrice:filters.minPrice,
                        maxPrice:filters.maxPrice,
                        county:filters.county
                    }),
                })
                let result = await response.json();
                setData(prevData => [...prevData, result]);
                setAnnouncementCrt(announcementCrt+1);
            }
            catch (e){
                console.log(e)
            }
        }
        else if (type==="profilePageFavorite"){
            const user = JSON.parse(localStorage.getItem('user'));
            let token = user.token;
            let userId = user.id;
            try{
                let response = await fetch(backend+`announcement/getFavoriteAnnouncement/${userId}/${announcementCrt}`,{
                    headers: {Authorization: 'Bearer ' + token},
                });
                let result = await response.json();
                setData(prevData => [...prevData, result]);
                setAnnouncementCrt(announcementCrt+1);
            }
            catch (e){
                console.log(e)
            }
        }
        else if (type==="profilePageMyAnnouncements"){
            const user = JSON.parse(localStorage.getItem('user'));
            let token = user.token;
            let userId = user.id;
            try{
                let response = await fetch(backend+`announcement/getMyAnnouncement/${userId}/${announcementCrt}`,{
                    headers: {Authorization: 'Bearer ' + token},
                });
                let result = await response.json();
                setData(prevData => [...prevData, result]);
                setAnnouncementCrt(announcementCrt+1);
            }
            catch (e){
                console.log(e)
            }
        }
        else {
            try {
                let response = await fetch(backend+`announcement/getByNrCrt/${announcementCrt}`)
                let result = await response.json();
                setData(prevData => [...prevData, result]);
                setAnnouncementCrt(announcementCrt+1);
            }
            catch (e){
                console.log(e)
            }
        }

    };

    return (
        <InfiniteScroll
            dataLength={data.length}
            next={loadData}
            hasMore={true}
            className={"infiniteScroll"}
        >
            {data.map(item => (
                <div key={item.id} >
                    <AnnouncementCard key={data.id} data={item} />
                </div>
            ))}
        </InfiniteScroll>
    );
}
