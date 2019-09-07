import React from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";

function NoMatch() {
  return (
      <Jumbotron>
        <h1>404 Page Not Found</h1>
        <Link className="text-center" to={"/"}>
          <p>Back to home</p>
        </Link>
      </Jumbotron>
  );
}

export default NoMatch;
