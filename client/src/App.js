import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login"
import Games from "./pages/Games";
import NoMatch from "./pages/NoMatch";
// import Painting from "./components/Painting"


function App() {
  return (
  
    <Router>
   
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/games" component={Games} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
