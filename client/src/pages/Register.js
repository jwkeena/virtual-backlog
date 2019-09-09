import React, { Component } from "react";
import { Link } from "react-router-dom"
import { MDBRow, MDBCol, MDBContainer } from 'mdbreact';
import { Button } from "react-bootstrap";
import API from "../utils/API";
import { Redirect } from 'react-router-dom';
import Jumbotron from "../components/Jumbotron";
import LoginFooter from '../components/LoginFooter';

class Register extends Component {
    state = {
        username: "",
        email: "",
        emailConfirm: "",
        password: "",
        passwordConfirm: "",
        redirectTo: null
    };

    handleInputChange = event => {
        let value = event.target.value;
        const name = event.target.name;
        this.setState({
        [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        
        if (!this.state.username) {
        alert("Enter a username before registering!");
        return;
        } else if (!this.state.email) {
        alert("Enter an email before registering.");
        return;
        } else if (this.state.email !== this.state.emailConfirm) {
        alert("Confirm email before registering.");
        return;
        } else if (this.state.email !== this.state.emailConfirm) {
        alert("Emails do not match.");
        return;
        } else if (!this.state.password) {
        alert ("Pick a password before registering!");
        return;
        } else if (this.state.password.length < 6) {
        alert("Password must be at least six characters.");
        return;
        } else if (this.state.password !== this.state.passwordConfirm) {
        alert("Passwords do not match.");
        return;
        } 

        this.registerUser();
    };

    registerUser = () => {

        const newUser = { 
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
        };

        API.registerUser(newUser)
        .then( res => {
            if (res.data.message) {
                
                console.log(res.data.message);
                if (res.data.message.match(/email/g)) {
                alert("There is already an account associated with that email.");
                } 
                
                if (res.data.message.match(/username/g)) {
                alert("That username is taken.");
                }

            } else {
                alert("Registration successful!");
                localStorage.removeItem("username"); // So that the following item will be rendered in the form
                localStorage.setItem("mostRecentUser", this.state.username)
                this.setState({
                redirectTo: '/'
                })
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <Jumbotron/>
                    <MDBContainer>
                    <MDBRow className="justify-content-center">
                        <MDBCol md="6">
                        <form>
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                            Username
                            </label>
                            <input
                            value={this.state.username}
                            name="username"
                            onChange={this.handleInputChange}
                            type="text"
                            id="defaultFormRegisterNameEx"
                            className="form-control"
                            autoComplete="off"
                            />
                            <br />
                            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                            Email
                            </label>
                            <input
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            type="email"
                            id="defaultFormRegisterEmailEx"
                            className="form-control"
                            autoComplete="off"
                            />
                            <br />
                            <label
                            htmlFor="defaultFormRegisterConfirmEx"
                            className="grey-text"
                            >
                            Confirm email
                            </label>
                            <input
                            name="emailConfirm"
                            value={this.state.emailConfirm}
                            onChange={this.handleInputChange}
                            type="email"
                            id="defaultFormRegisterConfirmEx"
                            className="form-control"
                            autoComplete="off"
                            />
                            <br />
                            <label
                            htmlFor="defaultFormRegisterPasswordEx"
                            className="grey-text"
                            >
                            Set password
                            </label>
                            <input
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            type="password"
                            id="defaultFormRegisterPasswordEx"
                            className="form-control"
                            autoComplete="off"
                            />
                            <br/>
                            <label
                            htmlFor="defaultFormRegisterPasswordEx2"
                            className="grey-text"
                            >
                            Confirm password
                            </label>
                            <input
                            name="passwordConfirm"
                            value={this.state.passwordConfirm}
                            onChange={this.handleInputChange}
                            type="password"
                            id="defaultFormRegisterPasswordEx2"
                            className="form-control"
                            autoComplete="off"
                            />
                            <div className="text-center mt-4">
                            <Button onClick={this.handleFormSubmit} variant="secondary" type="submit" className="pixel-font text-warning">
                                Register
                            </Button>
                            </div>
                        </form>
                        <br></br>
                        <Link className="text-center text-secondary" to={"/"}>
                            <p>back</p>
                        </Link>
                        </MDBCol>
                    </MDBRow>
                    <br/>
                    <br/>
                    </MDBContainer>
                    <LoginFooter/>
                </div>
            )
        }
    }
};

export default Register;