import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import CardHeader from "@mui/material/CardHeader";


export default function ContactCard(props) {

    const {data} = props;

    return (
        <Card sx={{ minWidth: 275, maxWidth: 300 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Contact
                </Typography>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {data?.appUser.username[0].toUpperCase()}
                        </Avatar>
                    }
                    title={data?.appUser.username}
                    // subheader={data.date.split("T")[0]}
                />
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data?.county}
                </Typography>
                <Typography variant="body2">
                    {data?.contact}
                </Typography>
            </CardContent>
        </Card>
    );
}