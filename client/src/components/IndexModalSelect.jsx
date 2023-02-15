import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../style/indexModalSelect.css'

export default function IndexModalSelect(props){
    const { data } = props;
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        // <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <>
        <FormControl className={"indexModalSelect"} size="small">
            <InputLabel id="demo-select-small">{data.label}</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                label={data.label}
                onChange={handleChange}
            >
                {/*<MenuItem value="">*/}
                {/*    <em>None</em>*/}
                {/*</MenuItem>*/}

                {/*<MenuItem value={10}>Ten</MenuItem>*/}
                {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                {/*<MenuItem value={30}>Thirty</MenuItem>*/}

                {data.elements.map((element, index) => {
                    return (
                        <MenuItem value={index*10} key={index}>{element}</MenuItem>
                    );
                })}
            </Select>
        </FormControl>
        </>
    );
}