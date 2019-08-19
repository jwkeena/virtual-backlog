import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Games from "./pages/Games";
import NoMatch from "./pages/NoMatch";
import Game from "./components/Game"
// import Painting from "./components/Painting"


class App extends Component {
  
  state = {
    loggedIn: false,
    username: ""
  }

  componentDidMount() {
    //check if there's a user in localstorage
  }

  updateUser = newUsername => {
    this.setState({
      username: newUsername,
      loggedIn: true
    });
  }

  logOut = () => {
    this.setState({
      loggedIn: false
    });
  }

  render() {
    return (
      <Router>
     
        <div>
          <Switch>
            <Route exact path="/" render={() => <Login updateUser={this.updateUser}/>} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/games" component={Games} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
  
}

export default App;
