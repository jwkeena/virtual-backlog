import React from "react";
import { Link } from "react-router-dom"
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Jumbotron from "../components/Jumbotron";

function NoMatch() {
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol size="md-12">
          <Jumbotron>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
          </Jumbotron>
        </MDBCol>
      </MDBRow>
      <Link className="text-center" to={"/"}>
        <p>Back to home</p>
      </Link>
    </MDBContainer>
  );
}

export default NoMatch;
