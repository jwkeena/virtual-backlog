import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Games from "./pages/Games";
import NoMatch from "./pages/NoMatch";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Painting from "./components/Painting"


class App extends Component {
  
  state = {
    loggedIn: false,
    username: "",
  }

  componentDidMount() {
    // Check if there's a logged in user in localstorage
    if (localStorage.getItem("username")) {
      this.setState({
        username: localStorage.getItem("username"),
        loggedIn: true
      });
    } else {
      this.setState({
        loggedIn: false
      })
    }
  }

  updateUser = newUsername => {
    this.setState({
      username: newUsername,
      loggedIn: true
    });
  }

  logoutBoolean = () => {
    this.setState({
      loggedIn: false
    })
  }
  
  render() {
    return (
      <Router>
        <div>
          
          <Switch>
            
            <Route exact path="/" render={() => <Login loggedIn={this.state.loggedIn} username={this.state.username} updateUser={this.updateUser}/>} />

            {/* This is the main games page route, only accessible after logging in */}
            {(this.state.loggedIn === true) &&  
            <Route exact path="/games" render={() => <Games loggedIn={this.state.loggedIn} logoutBoolean={this.logoutBoolean} username={this.state.username}/>} /> 
            }

            {/* this is the route after logging out */}
            {(this.state.loggedIn === false) &&  
            <Route exact path="/games" render={() => <Login updateUser={this.updateUser}/>} /> 
            }

            <Route exact path="/register" component={Register} />
            
            <Route component={NoMatch} />
            
          </Switch>
        </div>
      </Router>

    );
  }
  
}

export default App;
