import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Games from "./pages/Games";
import NoMatch from "./pages/NoMatch";
import Share from "./pages/Share";
import { ThemeProvider } from '@zendeskgarden/react-theming';
import '@zendeskgarden/react-forms/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Painting from "./components/Painting"


class App extends Component {
  
  state = {
    loggedIn: false,
    username: "",
  }

  componentDidMount() {
    // Logout at the end of a session
    // this.setState({
    //   loggedIn: false
    // })
    
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
      <ThemeProvider>
        <Router>
          <div>
            
            <Switch>
              {/* This is the route hit the first time the app is served */}
              <Route exact path="/" render={() => <Login loggedIn={this.state.loggedIn} logoutBoolean={this.logoutBoolean} username={this.state.username} updateUser={this.updateUser}/>} />

              {/* This is the main games page route, only accessible after logging in */}
              {(this.state.loggedIn === true) &&  
              <Route exact path="/games" render={() => <Games loggedIn={this.state.loggedIn} logoutBoolean={this.logoutBoolean} username={this.state.username}/>} /> 
              }

              {/* This is the route after logging out, to get the jumobotron back and the navbar to disappear */}
              {(this.state.loggedIn === false) &&  
              <Route exact path="/games" render={() => <Login loggedIn={this.state.loggedIn} username={this.state.username} updateUser={this.updateUser}/>} /> 
              }

              <Route exact path="/register" component={Register} />

              {/* Allows users to show off their collections without being logged in as that user */}
              <Route exact path="/:handle" component={Share} />

              <Route component={NoMatch} />
              
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
  
}

export default App;
