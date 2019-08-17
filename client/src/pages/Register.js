import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Jumbotron from "../components/Jumbotron";
import RegisterForm from "../components/RegisterForm";

class Register extends Component {

    // State

    // componentDidMount
    // Check if already logged in; if so, redirect to library or home page?

    render () {
        return (
        <MDBContainer fluid>
            <MDBRow>
                <MDBCol size='sm-12'>
                    <Jumbotron>
                        <h1>Virtual Backlog</h1>
                    </Jumbotron>
                </MDBCol>
            </MDBRow>

            <MDBRow>
                <RegisterForm/>
            </MDBRow>
        </MDBContainer>
        )
    }
};

export default Register;