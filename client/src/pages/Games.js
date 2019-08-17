import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Jumbotron from "../components/Jumbotron";

class Games extends Component {

    // componentDidMount: check if already logged in; if so, redirect to library or home page?

    render () {
        return (
        <MDBContainer fluid>
            <MDBRow>
                <MDBCol size='sm-12'>
                    <Jumbotron>
                        <h1>Games Bookshelf Page</h1>
                    </Jumbotron>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        )
    }
};

export default Games;