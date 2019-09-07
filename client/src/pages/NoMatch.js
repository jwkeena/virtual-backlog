import React from "react";
import { Link } from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron';

function NoMatch() {
  return (
      <Jumbotron>
        <h2 className="text-center text-warning">404 Page Not Found</h2>
        <Link className="text-center text-warning" to={"/"}>
          <p>back to home</p>
        </Link>
      </Jumbotron>
  );
}

export default NoMatch;
