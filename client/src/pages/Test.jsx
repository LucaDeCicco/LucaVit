import React, {useState} from 'react';
import '../style/test.css'
import Loading from "../components/Loading";
import BasicInput from "../components/BasicInput";


const Test = () => {

    return (
        <>
            <Loading/>
            <BasicInput data={"ceva"}/>
            <input/>
        </>
    );
};

export default Test;