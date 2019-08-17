import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
  
  // Setting the component's initial state
  state = {
    username: "",
    password: "",
    redirectTo: null
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit(event) {
    event.preventDefault()
    console.log('handleSubmit')

    axios
        .post('/user/login', {
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {
            console.log('login response: ')
            console.log(response)
            if (response.status === 200) {
                // update App.js state
                this.props.updateUser({
                    loggedIn: true,
                    username: response.data.username
                })
                // update the state to redirect to game library
                this.setState({
                    redirectTo: '/games'
                })
            }
        }).catch(error => {
            console.log('login error: ')
            console.log(error);
            
        })
  }

  render() {
    
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
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
                  <MDBBtn onSubmit={this.handleFormSubmit}>Login</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );
    }
  }
};

export default LoginForm;