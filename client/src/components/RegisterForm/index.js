import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import API from "../../utils/API";
import { Redirect } from 'react-router-dom';
class RegisterForm extends Component {
  
  // Setting the component's initial state
  state = {
    username: "",
    email: "",
    emailConfirm: "",
    password: "",
    passwordConfirm: "",
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

      // Check for duplicate usernames and emails in database
      if (res.data.message) {
        
        console.log(res.data.message);
        if (res.data.message.match(/email/g)) {
          alert("There is already an account associated with that email.");
        } 
        
        if (res.data.message.match(/username/g)) {
          alert("That username is taken.");
        }

      } else {
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
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <form>
            <p className="h4 text-center mb-4">Sign up</p>
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
            />
            <div className="text-center mt-4">
              <MDBBtn onClick={this.handleFormSubmit} color="unique" type="submit">
                Register
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
      );
    }
  }
};

export default RegisterForm;