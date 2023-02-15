import React from 'react';
import '../style/indexModal.css';
import IndexModalGrid from "./IndexModalGrid";

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