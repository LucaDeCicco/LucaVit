import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../style/indexModalSelect.css'
import Loading from "./Loading";
import {ADD_ANNOUNCEMENT_DETAILS, FILTER_DETAILS} from "../util/Store";
import {useAtom} from "jotai";

export default function IndexModalSelect(props){
    const { data } = props;
    const [val, setVal] = React.useState('');
    const [announcementDetails, setAnnouncementDetails] = useAtom(ADD_ANNOUNCEMENT_DETAILS);
    const [filterDetails, setFilterDetails] = useAtom(FILTER_DETAILS);


    const handleChange = (event) => {
        setVal(event.target.value);
        if (data.type==="addAnnouncement"){
            let field = data.label;
            switch (field){
                case "BodyType":
                    announcementDetails.bodyType=event.target.value;
                    break;
                case "Brand" :
                    announcementDetails.brand=event.target.value;
                    break;
                case "GearBox":
                    announcementDetails.gearBox=event.target.value;
                    break;
                case "Fuel":
                    announcementDetails.fuel=event.target.value;
                    break;
                case "County":
                    announcementDetails.county=event.target.value;
                    break;
                default:
                    console.log("switch default");
                    break;
            }
            setAnnouncementDetails(announcementDetails);
        }
        if (data.type==="filter"){
            let field = data.label;
            switch (field){
                case "BodyType":
                    filterDetails.bodyType=event.target.value;
                    break;
                case "Brand" :
                    filterDetails.brand=event.target.value;
                    break;
                case "Gearbox":
                    filterDetails.gearBox=event.target.value;
                    break;
                case "Fuel":
                    filterDetails.fuel=event.target.value;
                    break;
                case "Location":
                    filterDetails.county=event.target.value;
                    break;
                default:
                    console.log("switch default");
                    break;
            }
            setFilterDetails(filterDetails);
        }
    };


    return (
        // <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <>
            {data.elements ? (
                <FormControl className={"indexModalSelect"} size="small">
                    <InputLabel id="demo-select-small">{data.label}</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={val}
                        label={data.label}
                        onChange={handleChange}
                    >
                        {data.elements.map((element, index) => {
                            return (
                                <MenuItem value={index*10} key={index}>{element}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            ) : (
                <Loading/>
            )}

        </>
    );
}