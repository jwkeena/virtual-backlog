import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBInput } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import axios from 'axios';
import API from '../utils/API';
import Jumbotron from '../components/Jumbotron';
import LoginFooter from '../components/LoginFooter';
import '../components/LoginFooter/styles.css';
import Pointer from '../components/Painting/Cursor.png';

const styles = {
  middle: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  loginMiddle: {
    position: "fixed",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}

class Login extends Component {

    state = {
        username: "",
        password: "",
        loggedIn: this.props.loggedIn,
        redirectTo: null,
        continueTracker: "up"
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

    handleContinueTracker = (option) => {
      this.setState({
        continueTracker: option
      })
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

    toCollection = () => {
      this.setState({
        redirectTo: '/games'
      })
    }

    render () {
            if (this.state.redirectTo !== null) {
              return <Redirect to={{ pathname: this.state.redirectTo }} />
            } else {
              return (
            <div>

                <Jumbotron/>

                <MDBContainer>
                
                  {(this.props.loggedIn) && 
                    <div className="text-center text-secondary" >
                      <br/><br/>
                      <div style={styles.middle}>
                        <h5>logged in as <b>{this.state.username}</b></h5>
                        <br/>
                        <Button type="submit" variant="warning" className="button text-secondary" title="Back to collection" onClick={this.toCollection}>{this.state.username}'s collection</Button>
                        <br/><br/>
                        <Link className="text-center text-secondary" onClick={this.logout}>
                          <p>game over (logout)</p>
                        </Link>
                      </div>
                    </div>
                  }

                  {!this.props.loggedIn && 
                  <div>
                    <div style={styles.loginMiddle}>                   
                       
                        <div className={(this.state.continueTracker === "up") ? "continue-up" : "continue-down"}>Continue?</div>
                        <img className={(this.state.continueTracker === "up") ? "cursor-up" : "cursor-down"} src = {Pointer} alt="FF Cursor"/>   
                        <form>
                          <div className="grey-text container" >
                            <MDBInput
                              className="float-left"
                              name="username"
                              value={this.state.username}
                              onChange={this.handleInputChange}
                              onClick={() => this.handleContinueTracker("up")}
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
                              onClick={() => this.handleContinueTracker("down")}
                              label="Password"
                              icon="lock"
                              group
                              type="password"
                              validate
                            />
                          </div>
                          <div className="text-center">
                            <Button className="button text-secondary" title="Login" type="submit" variant="warning" onClick={this.handleFormSubmit}>Press Start</Button>
                          </div>
                        </form>
                    <br/>
                    <Link className="text-center" to={"/register/"}>
                    <p className="newGame" title="Register new account">New Game?</p>
                    </Link>
                    </div>
                  </div>}
                  <LoginFooter/>
                </MDBContainer>
                </div>
            )
        }
    }
};

export default Login;