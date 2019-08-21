import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Jumbotron from '../components/Jumbotron';

class Login extends Component {

    // Setting the component's initial state
    state = {
        username: "",
        password: "",
        loggedIn: this.props.loggedIn,
        redirectTo: null
    };

    componentDidMount () {
        if (localStorage.getItem("mostRecentUser")) {
        this.setState({
            username: localStorage.getItem("mostRecentUser")
        });
        }

        if (localStorage.getItem("username")) {
        this.setState({
            username: localStorage.getItem("username")
        });
        }
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;

        // Updating the input's state
        this.setState({
        [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.props)
        console.log('handleSubmit', this.state.username);

        axios
            .post('/api/users/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ', response)
                if (response.status === 200) {
                console.log("Successful login");
                // Update localstorage
                localStorage.setItem("username", this.state.username);
                localStorage.setItem("mostRecentUser", this.state.username)
                // update App.js state
                this.props.updateUser(this.state.username)
                // update the state to redirect to game library
                this.setState({
                    redirectTo: '/games'
                })
                }
            }).catch(error => {
                if (error) {
                console.log('login error: ', error);
                alert("Incorrect username or password.");
                }  
            })
    }

    render () {
            if (this.state.redirectTo !== null) {
              return <Redirect to={{ pathname: this.state.redirectTo }} />
            } else {
              return (
            <div>
                <Jumbotron><h1>Virtual Backlog</h1></Jumbotron>
                  <MDBContainer>
                    <MDBRow className ="justify-content-center">
                      <MDBCol md="6" >
                        <form>
                          <p className="h5 text-center mb-4">Sign in</p>
                          <div className="grey-text">
                            <MDBInput
                              name="username"
                              value={this.state.username}
                              onChange={this.handleInputChange}
                              label="Username"
                              icon="envelope"
                              group
                              type="text"
                              validate
                              error="wrong"
                              success="right"
                            />
                            <MDBInput
                              name="password"
                              value={this.state.password}
                              onChange={this.handleInputChange}
                              label="Type your password"
                              icon="lock"
                              group
                              type="password"
                              validate
                            />
                          </div>
                          <div className="text-center">
                            <MDBBtn type="submit" color="unique" onClick={this.handleFormSubmit}>Login</MDBBtn>
                          </div>
                        </form>
                      </MDBCol>
                    </MDBRow>
                    <br/>
                    <Link className="text-center" to={"/register/"}>
                    <p>Don't have an account?</p>
                    </Link>
                  </MDBContainer>
                </div>
            )
        }
    }
};

export default Login;