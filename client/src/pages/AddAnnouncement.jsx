import React, {useEffect} from 'react';
import {useAtom} from "jotai";
import {ADD_ANNOUNCEMENT_DETAILS, BASE_PATH, LOGGED_IN} from "../util/Store";
import {CAR_SPECS} from "../util/Store";
import Loading from "../components/Loading";
import '../style/addAnnouncementPage.css';
import sellAndBuyImage from '../resources/Sell-BuyNB.png'
import IndexModalSelect from "../components/IndexModalSelect";
import axios from "axios";
import BasicInput from "../components/BasicInput";
import Textarea from "../components/Textarea";
import FileBase64 from "react-file-base64";
import Button from "@mui/material/Button";


const AddAnnouncement = () => {

    const [loggedIn, setLoggedIn] = useAtom(LOGGED_IN);
    const [carSpecs, setCarSpecs] = useAtom(CAR_SPECS);
    const [announcementDetails, setAnnouncementDetails] = useAtom(ADD_ANNOUNCEMENT_DETAILS);


    useEffect(() => {
        if (loggedIn === "false") {
            window.location.replace("/login")
        }

        async function fetchBrandsData() {
            if (!carSpecs) {
                try {
                    let response = await axios.get(BASE_PATH + "specs/getAllSpecs");
                    setCarSpecs(response.data);
                } catch (e) {
                    console.log("error: " + e);
                }
            }
        }

        fetchBrandsData()

    }, [])

    const addAnnouncement = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        let token = user.token
        let username = user.username;
        try {
            await fetch(BASE_PATH + "announcement/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({
                    bodyType: carSpecs.bodyTypes[announcementDetails.bodyType / 10],
                    brand: carSpecs.brands[announcementDetails.brand / 10],
                    gearBoxType: carSpecs.gearBoxTypes[announcementDetails.gearBox / 10],
                    fuel: carSpecs.fuels[announcementDetails.fuel / 10],
                    year: parseInt(announcementDetails.year),
                    km: parseInt(announcementDetails.km),
                    vin: announcementDetails.vin,
                    description: announcementDetails.description,
                    images: announcementDetails.images,
                    price: parseInt(announcementDetails.price),
                    county: carSpecs.counties[announcementDetails.county / 10],
                    contact: announcementDetails.contact,
                    authorName: username
                }),
            });
            window.location.replace("/")
        } catch (e) {
            console.log(e);
        }

    }

    const uploadImages = (files) => {
        for (let file of files) {
            announcementDetails.images.push(file.base64);
            setAnnouncementDetails(announcementDetails);
        }
    }

    const createDataObject = (label, elements, type) => {
        return {
            label: label,
            elements: elements,
            type: type
        };
    };

    return (
        <>
            {loggedIn ? (
                <div className="parentAddAnnouncement">
                    <div className="div1AddAnnouncement">
                        <h1 className={"addAnnouncementTitle"}>Add Announcement</h1>
                        <h3>Car Details</h3>
                        <div className="parentAddCarDetails">
                            <div className="div1AddCarDetails">
                                <IndexModalSelect
                                    data={createDataObject("BodyType", carSpecs.bodyTypes, "addAnnouncement")}/>
                            </div>
                            <div className="div2AddCarDetails">
                                <IndexModalSelect data={createDataObject("Brand", carSpecs.brands, "addAnnouncement")}/>
                            </div>
                            <div className="div3AddCarDetails">
                                <IndexModalSelect
                                    data={createDataObject("GearBox", carSpecs.gearBoxTypes, "addAnnouncement")}/>
                            </div>
                            <div className="div4AddCarDetails">
                                <IndexModalSelect data={createDataObject("Fuel", carSpecs.fuels, "addAnnouncement")}/>
                            </div>
                            <div className="div5AddCarDetails">
                                <BasicInput data={"year"}/>
                            </div>
                            <div className="div6AddCarDetails">
                                <BasicInput data={"Km"}/>
                            </div>
                        </div>
                        <div className={"addVin"}>
                            <BasicInput data={"VIN"}/>
                        </div>
                        <h3>Description</h3>
                        <Textarea data={"addAnnouncement"}/>
                        <br/>
                        <label>Add Images </label>
                        <FileBase64
                            multiple={true}
                            onDone={uploadImages}
                        />
                        <br/>
                        <br/>
                        <div>
                            <div style={{float: "left"}}>
                                <BasicInput data={"Price"}/>
                            </div>
                            <h4 style={{float: "left"}}>&nbsp; ??? EUR</h4>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <h3>Contact</h3>
                        <IndexModalSelect data={createDataObject("County", carSpecs.counties, "addAnnouncement")}/>
                        <br/>
                        <br/>
                        <BasicInput data={"Email or Phone"}/>
                        <br/>
                        <br/>
                        <Button variant="contained" color="success" onClick={addAnnouncement}>
                            Add announcement
                        </Button>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                    <div className="div2AddAnnouncement">
                        <img src={sellAndBuyImage} style={{maxWidth: "25em", maxHeight: "25em"}}/>
                    </div>
                </div>
            ) : (
                <div style={{position: "absolute", left: "47%", top: "100px"}}>
                    <Loading/>
                </div>
            )}
        </>

    )
};

export default AddAnnouncement;