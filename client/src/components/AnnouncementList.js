import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {BASE_PATH, FILTER_STORE} from "../util/Store";
import AnnouncementCard from "./AnnouncementCard";
import '../style/infiniteScroll.css'
import {useAtom} from "jotai";

export default function AnnouncementList(props) {
    const [data, setData] = useState([]);
    const [announcementCrt, setAnnouncementCrt] = useState(1);
    const [filters, setFilters] = useAtom(FILTER_STORE);
    const {type} = props;

    // useEffect(() => {
    //     loadData();
    // }, []);


    const loadData = async () => {
        if (type==="filter"){
            const user = JSON.parse(localStorage.getItem('user'));
            let token = user.token
            let response = await fetch(`http://localhost:8888/announcement/filter/${announcementCrt}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token
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
            //TODO
            try {
                let result = await response.json();
                console.log("sa vedem rezultatul: "+result);
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
                let response = await fetch(`http://localhost:8888/announcement/getFavoriteAnnouncement/${userId}/${announcementCrt}`,{
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
                let response = await fetch(`http://localhost:8888/announcement/getMyAnnouncement/${userId}/${announcementCrt}`,{
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
            const user = JSON.parse(localStorage.getItem('user'));
            let token = user.token
            let response = await fetch(`http://localhost:8888/announcement/getByNrCrt/${announcementCrt}`, {
                headers: {Authorization: 'Bearer ' + token},
            })
            try {
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
            // style={{marginLeft:"5em"}}
            className={"infiniteScroll"}
        >
            {data.map(item => (
                // randeaza fiecare item din lista
                <div key={item.id} >
                    {/*<h1 key={item.id} style={{color:"red"}}>{item.description}</h1>*/}
                    <AnnouncementCard key={data.id} data={item} />
                    {/*<br/>*/}
                </div>

            ))}
        </InfiniteScroll>
    );
}
