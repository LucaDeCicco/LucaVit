import React from 'react';
import {useAtom} from "jotai";
import {FILTER_STORE} from "../util/Store";
import AnnouncementList from "../components/AnnouncementList";
import Loading from "../components/Loading";


const FilteredAnnouncementsPage = () => {
    const [filters] = useAtom(FILTER_STORE);
    if (filters.filter) {
        return (
            <div>
                <AnnouncementList type={"filter"}/>
            </div>
        )
    } else {
        return (
            <div>
                <Loading/>
            </div>
        )
    }


};

export default FilteredAnnouncementsPage;