import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useAtom} from "jotai";
import {ADD_ANNOUNCEMENT_DETAILS} from "../util/Store";
import '../style/addAnnouncementPage.css'

export default function BasicInput(props) {
    const { data } = props;
    const [announcementDetails, setAnnouncementDetails] = useAtom(ADD_ANNOUNCEMENT_DETAILS);

    const inputHandle =(event)=> {
        switch (data) {
            case "Km":
                announcementDetails.km=event.target.value;
                break;
            case "year":
                announcementDetails.year=event.target.value;
                break;
            case "VIN":
                announcementDetails.vin=event.target.value;
                break;
            case "Price":
                announcementDetails.price=event.target.value;
                break;
            case "Email or Phone":
                announcementDetails.contact=event.target.value;
                break;
            default:
                console.log("case default");
                break;
        }
        setAnnouncementDetails(announcementDetails);
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" className={"addPrice"} style={{width:"17em"}} label={data} onChange={inputHandle} variant="outlined" />
        </Box>
    );
}