import * as React from 'react';
import IndexModalSelect from "./IndexModalSelect";
import '../style/indexModalSelect.css'
import '../style/indexModalGrid.css'
import IndexModalSmallSelect from "./IndexModalSmallSelect";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';


export default function IndexModalGrid() {

    const createDataObject = (label, elements) => {
        return {
            label: label,
            elements: elements,
        };
    };

    // const data = createDataObject("value1", "value2", "value3");



    return (
        <>
            <div className={"parent"}>
                <div className={"div1 firstCol row"}><IndexModalSelect data={createDataObject("Body type",["automatic", "manual"])}/></div>
                <div className={"div2"}><IndexModalSelect data={createDataObject("Brand",["automatic", "manual"])}/></div>
                <div className={"div3"}><IndexModalSelect data={createDataObject("Location",["automatic", "manual"])}/></div>
                <div className={"div4"}><IndexModalSelect data={createDataObject("Gearbox",["automatic", "manual"])}/></div>
                <div className="div5 two-divs">
                    <div className="tow-divs-1"><IndexModalSmallSelect data={createDataObject("Price")}/></div>
                    <div className="tow-divs-2"><IndexModalSmallSelect data={createDataObject("Price")}/></div>
                </div>
                <div className="div6 two-divs">
                    <div className="tow-divs-1"><IndexModalSmallSelect data={createDataObject("Year")}/></div>
                    <div className="tow-divs-2"><IndexModalSmallSelect data={createDataObject("Year")}/></div>
                </div>
                <div className="div7"><IndexModalSelect data={createDataObject("Fuel",["automatic", "manual"])}/></div>
                <div className="div8 two-divs">
                    <div className="tow-divs-1"><IndexModalSmallSelect data={createDataObject("Km")}/></div>
                    <div className="tow-divs-2"><IndexModalSmallSelect data={createDataObject("Km")}/></div>
                </div>
                <div className="div9"></div>
                <div className="div10"><Button variant="contained" style={{float:"right", marginRight:"2.4em", minWidth:"12em"}} color={"error"}>Search<SearchIcon/></Button></div>
            </div>
        </>
    );
}