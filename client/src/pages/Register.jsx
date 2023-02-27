import React from 'react';
import '../style/LoginForm.css'
import RegisterCredentials from "../components/RegisterCredentials";

const Register = () => {

    return (
        <div className={"form"}>
            <div className="parent-login-form">
                <div className="div1-login-form">
                    <RegisterCredentials/>
                </div>
                <div className="div2-login-form"><img alt={"registerImg"} style={{minHeight: "18em", marginTop: "1em"}}
                                                      className={"loginImg"}
                                                      src={"https://img.freepik.com/free-vector/businessman-holding-pencil-big-complete-checklist-with-tick-marks_1150-35019.jpg?w=1060&t=st=1676466043~exp=1676466643~hmac=de982055be8cd901a120d48a38202d6e823e1e8ec5ac1f105f94323876bf285a"}/>
                </div>
            </div>
        </div>
    )
};

export default Register;