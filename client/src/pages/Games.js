import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import Jumbotron from "../components/Jumbotron";
import Game from "../components/Game";

class Games extends Component {

    // State

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