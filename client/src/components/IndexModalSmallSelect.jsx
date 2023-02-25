import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../style/indexModalSelect.css'
import Loading from "./Loading";
import {useAtom} from "jotai";
import {FILTER_DETAILS} from "../util/Store";

export default function IndexModalSmallSelect(props) {
    const { data } = props;

    const [age, setAge] = React.useState('');
    const [filterDetails, setFilterDetails] = useAtom(FILTER_DETAILS);


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const updateFilterCriteria =(e)=>{
        if (data.type==="filter"){
            let field = data.label;
            switch (field){
                case "FromPrice":
                    console.log("fromPrice: "+e.target.valueOf().innerText)
                    filterDetails.minPrice=e.target.valueOf().innerText;
                    break;
                case "ToPrice" :
                    filterDetails.maxPrice=e.target.valueOf().innerText;
                    break;
                case "FromYear":
                    filterDetails.minYear=e.target.valueOf().innerText;
                    break;
                case "ToYear":
                    filterDetails.maxYear=e.target.valueOf().innerText;
                    break;
                case "FromKm":
                    filterDetails.minKm=e.target.valueOf().innerText;
                    break;
                case "ToKm":
                    filterDetails.maxKm=e.target.valueOf().innerText;
                    break;
                default:
                    console.log("switch default");
                    break;
            }
            setFilterDetails(filterDetails);
        }
    }

    return (
        // <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <>
            {data.elements ? (
                <FormControl className={"indexModalSmallSelect"} size="small">
                    <InputLabel id="demo-select-small">{data.label}</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={age}
                        label={data.label}
                        onChange={handleChange}
                    >
                        {data.elements.map((element, index) => {
                            return (
                                <MenuItem value={index*10} onClick={updateFilterCriteria} key={index}>{element}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            ):(
                <Loading />
            )}

        </>
    );
}