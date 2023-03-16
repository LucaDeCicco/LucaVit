import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useEffect} from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar({data}) {
    const [open, setOpen] = React.useState(false);

    useEffect(()=> {
        if (data.open){
            setOpen(true);
        }
    },[data.open])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        data.setter(false);
    };

    return (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={data.type} sx={{ width: '100%' }}>
                    {data.message}
                </Alert>
            </Snackbar>
    );
}