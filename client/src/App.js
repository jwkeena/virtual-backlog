import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Games from "./pages/Games";
import NoMatch from "./pages/NoMatch";
import FixedNavbar from "./components/FixedNavbar";
import Jumbotron from './components/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Painting from "./components/Painting"


class App extends Component {
  
  state = {
    loggedIn: false,
    username: "",
  }

  componentDidMount() {
    // Check if there's a logged in user in localstorage
    if (localStorage.getItem("username") !== null) {
      this.setState({
        username: localStorage.getItem("username"),
        loggedIn: true
      });
    } 
  }

  updateUser = newUsername => {
    this.setState({
      username: newUsername,
      loggedIn: true
    });
  }
  
  render() {
    return (
      <Router>
        <div>

          {(this.state.loggedIn === true) ? <div><FixedNavbar logout={this.props} loggedIn={this.state.loggedIn} username={this.state.username}/><br/></div> : <Jumbotron><h1>Virtual Backlog</h1></Jumbotron>}
          
          <Switch>
            
            <Route exact path="/" render={() => <Login updateUser={this.updateUser}/>} />

            <Route exact path="/register" component={Register} />
            
            {(this.state.loggedIn === true) &&  
            <Route exact path="/games" component={Games} /> 
            }

            {/* this is the demo route */}
            {/* {(this.state.loggedIn === false) &&  
            <Route exact path="/games" render={() => <Login updateUser={this.updateUser}/>} /> 
            } */}

            <Route component={NoMatch} />
            
          </Switch>
        </div>
      </Router>

    );
  }
  
}

export default App;
