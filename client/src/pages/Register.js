import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import RegisterForm from "../components/RegisterForm";

class Register extends Component {

    // State

    // componentDidMount
    // Check if already logged in; if so, redirect to library or home page?

    render () {
        return (
        <MDBContainer fluid>
            <MDBRow>
                <RegisterForm/>
            </MDBRow>
        </MDBContainer>
        )
    }
};

export default Register;