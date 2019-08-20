import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow } from 'mdbreact';
import Jumbotron from '../components/Jumbotron';
import FixedNavbar from "../components/FixedNavbar";
import LoginForm from "../components/LoginForm";

class Login extends Component {

    // componentDidMount
    componentDidMount() {
        console.log(this.props)
    }

    render () {
        return (
        <MDBContainer fluid>

            {
                (this.props.loggedIn === true) ? 
                    <div><FixedNavbar loggedIn={this.props.loggedIn} username={this.props.username}/><br/></div> 
                : 
                    <Jumbotron><h1>Virtual Backlog</h1></Jumbotron>
            }

            <MDBRow>
                <LoginForm updateUser={this.props.updateUser}></LoginForm>
            </MDBRow>

            <br/>
            <Link className="text-center" to={"/register/"}>
            <p>Don't have an account?</p>
            </Link>
            
        </MDBContainer>
        )
    }
};

export default Login;