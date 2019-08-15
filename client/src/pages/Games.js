import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Game from "../components/Game"

class Games extends Component {

    // State

    // componentDidMount: check if already logged in; if so, redirect to library or home page?

    render () {
        return (
        <Container fluid>
            <Row>
                <Col size='sm-12'>
                    <Jumbotron>
                        <h1>Games Bookshelf Page</h1>
                    </Jumbotron>
                </Col>
                {/* <Game title={"Super Mario Odyssey"}/> */}
            </Row>
        </Container>
        )
    }
};

export default Games;