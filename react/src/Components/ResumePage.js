import React from 'react';
import {Jumbotron, Container} from 'reactstrap';
import './ResumePage.css'

export default class ResumePage extends React.Component {
  render(){
    return(
      <div>
        <Container>
          <Jumbotron className="text-center">
            <h1>Resume</h1>
          </Jumbotron>
          <object width="100%" height="800px" 
            type="application/pdf" 
            data="/files/ZelenkaChrisResume.pdf" >
            PDF Viewer is not supported by your broswer. View Resume <a href="/files/ZelenkaChrisResume.pdf">here</a>.
          </object>
        </Container>
      </div>
    );
  }
}