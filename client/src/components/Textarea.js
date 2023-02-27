import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useAtom} from "jotai";
import {ADD_ANNOUNCEMENT_DETAILS} from "../util/Store";
import '../style/addAnnouncementPage.css'

export default function Textarea(props) {
    const {data} = props;
    const [announcementDetails, setAnnouncementDetails] = useAtom(ADD_ANNOUNCEMENT_DETAILS);

    const addDescription = (event) => {
        if (data === "addAnnouncement") {
            announcementDetails.description = event.target.value;
            setAnnouncementDetails(announcementDetails);
        }
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="filled-multiline-static"
                    label="Write a description about your announcement"
                    multiline
                    rows={4}
                    defaultValue="Write a description about your announcement"
                    variant="filled"
                    className={"addDescription"}
                    onChange={addDescription}
                />
            </div>
        </Box>
    );
}