import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useState} from "react";

export default function PhotoContainer(props) {
    const { data } = props;
    const [photoIndex, setPhotoIndex] = useState(0);

    const previousPhoto =()=> {
        if (photoIndex>0){
            setPhotoIndex(photoIndex-1)
        }
    }

    const nextPhoto =()=> {
        if (data.length-1>photoIndex){
            setPhotoIndex(photoIndex+1)
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" style={{ marginLeft: '5em', width:"120em" }}>
                <Box sx={{ bgcolor: 'rgba(225,225,225,0.6)',width:"37em", height: '40vh', display: 'flex', alignItems: 'center', paddingX: '1.3em' }}>
                    {photoIndex!==0?<KeyboardArrowLeftIcon onClick={previousPhoto} style={{ marginRight: '1em', cursor:"pointer" }} />
                        :<KeyboardArrowLeftIcon style={{color:"rgba(168,167,167,0.6)", marginRight:"1em"}} />}
                    <img style={{ width:"25em", height:"18.8em", flex: '1' }} src={data[photoIndex]} alt="car" />
                    {photoIndex<data.length-1?<KeyboardArrowRightIcon onClick={nextPhoto} style={{ marginLeft: '1em', cursor:"pointer" }} />
                        :<KeyboardArrowRightIcon style={{color:"rgba(168,167,167,0.6)", marginLeft:"1em"}} />}
                </Box>
            </Container>
        </React.Fragment>
    );
}
