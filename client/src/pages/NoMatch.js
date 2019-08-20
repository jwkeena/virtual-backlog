import React from "react";
import { Link } from "react-router-dom"
import { MDBRow, MDBCol } from 'mdbreact';
import Jumbotron from "../components/Jumbotron";

function NoMatch() {
  return (
    <MDBRow>
      <MDBCol size="md-12">
        <Jumbotron>
          <h1>404 Page Not Found</h1>
          <Link className="text-center" to={"/"}>
            <p>Back to home</p>
          </Link>
        </Jumbotron>
      </MDBCol>
    </MDBRow>
  );
}

export default NoMatch;
