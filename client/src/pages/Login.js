import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

class Login extends Component {

    // State

    // componentDidMount
    // Check if already logged in; if so, redirect to library or home page?

    render () {
        return (
        <Container fluid>
            <Row>
                <Col size='sm-12'>
                    <Jumbotron>
                        <h1>Login Page</h1>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
        )
    }
};

export default Login;