import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import '../style/AnnouncementPage.css'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function AnnouncementPageDetails(props) {

    const {data} = props;

    return (
        <>
            <h4 style={{textAlign:"center"}}>{data?.date.split("T")[0]}</h4>
            <div className={"announcementPageDetails"}>
                <Stack direction="row" spacing={2} style={{marginBottom:"2em"}}>
                    <Item>{data?.county}</Item>
                    <Item>{data?.car.brand}</Item>
                    <Item>{data?.car.bodyType}</Item>
                    <Item>{data?.car.year}</Item>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Item>{data?.car.km} Km</Item>
                    <Item>{data?.car.combustible}</Item>
                    <Item>{data?.car.gearBoxType}</Item>
                    <Item>{data?.car.vin} VIN</Item>
                </Stack>
            </div>
        </>

    );
}