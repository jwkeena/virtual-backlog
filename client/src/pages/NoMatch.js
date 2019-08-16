import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
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
    </MDBContainer>
  );
}

export default NoMatch;
