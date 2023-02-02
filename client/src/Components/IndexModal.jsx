import React from 'react';
import '../CSS/indexModal.css';
import IndexModalGrid from "./IndexModalGrid";
import IndexModalSmallSelect from "./IndexModalSmallSelect";

const IndexModal = () => {
    return (
        <>
        <div className={"filterModal"}>
            <IndexModalGrid />
        </div>
        </>
    )
};

export default IndexModal;