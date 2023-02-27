import * as React from 'react';
import IndexModalSelect from "./IndexModalSelect";
import '../style/indexModalSelect.css'
import '../style/indexModalGrid.css'
import IndexModalSmallSelect from "./IndexModalSmallSelect";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";
import {BASE_PATH, CAR_SPECS, FILTER_DETAILS, FILTER_STORE, LOGGED_IN} from "../util/Store";
import axios from "axios";
import {useAtom} from "jotai";


export default function IndexModalGrid() {

    const [carSpecs, setCarSpecs] = useAtom(CAR_SPECS);
    const [fromPriceList] = useState([500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000]);
    const [maxPriceList] = useState([1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000]);
    const [years] = useState([2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007])
    const [kmList] = useState([5000, 10000, 25000, 50000, 100000, 150000, 200000, 300000])
    const [filterDetails] = useAtom(FILTER_DETAILS);
    const [filterStore, setFilterStore] = useAtom(FILTER_STORE);
    const [loggedIn] = useAtom(LOGGED_IN);

    useEffect(() => {
        async function fetchBrandsData() {
            if (!carSpecs) {
                try {
                    let response = await axios.get(BASE_PATH + "specs/getAllSpecs");
                    console.log(response.data);
                    setCarSpecs(response.data);
                } catch (e) {
                    console.log("error: " + e);
                }
            }
        }

        fetchBrandsData();
    }, [])

    const createDataObject = (label, elements, type) => {
        return {
            label: label,
            elements: elements,
            type: type
        };
    };

    const searchAnnouncements = () => {
        if (!loggedIn) {
            window.location.replace("/login")
        } else {
            filterStore.filter = true;
            filterStore.bodyType = carSpecs.bodyTypes[filterDetails.bodyType / 10];
            filterStore.brand = carSpecs.brands[filterDetails.brand / 10];
            filterStore.gearBox = carSpecs.gearBoxTypes[filterDetails.gearBox / 10];
            filterStore.fuel = carSpecs.fuels[filterDetails.fuel / 10];
            filterStore.minYear = filterDetails.minYear;
            filterStore.maxYear = filterDetails.maxYear;
            filterStore.minKm = filterDetails.minKm;
            filterStore.maxKm = filterDetails.maxKm;
            filterStore.minPrice = filterDetails.minPrice;
            filterStore.maxPrice = filterDetails.maxPrice;
            filterStore.county = carSpecs.counties[filterDetails.county / 10]
            setFilterStore(filterStore);
            window.location.replace("/filteredAnnouncements")
        }

    }


    return (
        <>
            <div className={"parent"}>
                <div className={"div1 firstCol row"}><IndexModalSelect
                    data={createDataObject("BodyType", carSpecs?.bodyTypes, "filter")}/></div>
                <div className={"div2"}><IndexModalSelect data={createDataObject("Brand", carSpecs?.brands, "filter")}/>
                </div>
                <div className={"div3"}><IndexModalSelect
                    data={createDataObject("Location", carSpecs?.counties, "filter")}/></div>
                <div className={"div4"}><IndexModalSelect
                    data={createDataObject("Gearbox", carSpecs?.gearBoxTypes, "filter")}/></div>
                <div className="div5 two-divs">
                    <div className="tow-divs-1"><IndexModalSmallSelect
                        data={createDataObject("FromPrice", fromPriceList, "filter")}/></div>
                    <div className="tow-divs-2"><IndexModalSmallSelect
                        data={createDataObject("ToPrice", maxPriceList, "filter")}/></div>
                </div>
                <div className="div6 two-divs">
                    <div className="tow-divs-1"><IndexModalSmallSelect
                        data={createDataObject("FromYear", years, "filter")}/></div>
                    <div className="tow-divs-2"><IndexModalSmallSelect
                        data={createDataObject("ToYear", years, "filter")}/></div>
                </div>
                <div className="div7"><IndexModalSelect data={createDataObject("Fuel", carSpecs?.fuels, "filter")}/>
                </div>
                <div className="div8 two-divs">
                    <div className="tow-divs-1"><IndexModalSmallSelect
                        data={createDataObject("FromKm", kmList, "filter")}/></div>
                    <div className="tow-divs-2"><IndexModalSmallSelect
                        data={createDataObject("ToKm", kmList, "filter")}/></div>
                </div>
                <div className="div9"></div>
                <div className="div10"><Button variant="contained" onClick={searchAnnouncements}
                                               style={{float: "right", marginRight: "2.4em", minWidth: "12em"}}
                                               color={"error"}>Search<SearchIcon/></Button></div>
            </div>
        </>
    );
}