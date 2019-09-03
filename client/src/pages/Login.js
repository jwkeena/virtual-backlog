import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import axios from 'axios';
import API from '../utils/API';
import Jumbotron from '../components/Jumbotron';
import LoginFooter from '../components/LoginFooter';
class Login extends Component {

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
        let value = event.target.value;
        const name = event.target.name;
        this.setState({
        [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
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
                localStorage.setItem("mostRecentUser", this.state.username);
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

    logout = event => {
      event.preventDefault();
      API.logout({username: this.props.username}).then(response => {
        console.log(response.data)
        if (response.status === 200) {
          localStorage.removeItem("username")
          this.props.logoutBoolean();
        }
      }).catch(error => {
          console.log("logout error ", error)
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
                    
                    {(this.props.loggedIn) && 
                      <div className="text-center">
                        <h5>logged in as <b>{this.state.username}</b></h5>
                        <br/>
                        <Button type="submit" onClick={this.logout} variant="primary">Logout</Button>
                        <br/><br/>
                        <Link className="text-center" to={"/games"}>
                          <p>Back to collection</p>
                        </Link>
                      </div>
                    }

                    {!this.props.loggedIn && 
                    <div>
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
                              <Button type="submit" variant="primary" onClick={this.handleFormSubmit}>Login</Button>
                            </div>
                          </form>
                        </MDBCol>
                      </MDBRow>
                      <br/>
                      <Link className="text-center" to={"/register/"}>
                      <p>Don't have an account?</p>
                      </Link>
                    </div>

                    }
                    <LoginFooter/>
                  </MDBContainer>
                </div>
            )
        }
    }
};

export default Login;