import React from 'react';
import createReactClass from 'create-react-class';
import {Jumbotron, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import './BlogPage.css';
import $ from 'jquery'

var BlogEntry = createReactClass({
  render() {
    var d = new Date(this.props.entry.entry_date);
    return(
     <div>
      <h2 className="entry_title">{this.props.entry.title}</h2>
      <h4 className="entry_date">{d.toLocaleDateString()}</h4>
      <p className="entry_body" dangerouslySetInnerHTML={ {__html: this.props.entry.body} } />
      <hr></hr>
     </div> 
    );
  }
});

var BlogSection = createReactClass({
  render() {
    var entryDatas = this.props.entries.map(function(ent) {
      return <BlogEntry key={ent._id} entry={ent} />
    });
    return(
      <div>
        {entryDatas}
      </div>
    );
  }
});

var BlogPage = createReactClass({
  getInitialState: function() {
    return {entries: []};
  },
  
  render() {
    return(
      <div id="content" className="container">
        <Jumbotron className="text-center">
          <h1>Chris Zelenka's Blog</h1>
        </Jumbotron>
        <Row>
          <Col lg={8} id="entries">
           <BlogSection entries={this.state.entries} /> 
          </Col>
          <Col lg={3} lgOffset={1} id="sidebar">
            <div id="aboutme" className="bg-faded side-bar">
              <h3 className="side-bar-title">
                <i className="fa fa-user-circle-o fa-fw"></i>
                &nbsp;About
              </h3>
              <p>Personal webpage to showcase my projects and resume.</p>
            </div>
            <div id="contactme" className="bg-faded side-bar">
              <h3 className="side-bar-title">
                <i className="fa fa-address-card-o fa-fw"></i>
                &nbsp;Contact Me
              </h3>
              <ListGroup>
                <ListGroupItem href="mailto:zelenkachris@gmail.com" target="_blank">
                  <i className="fa fa-envelope fa-fw"></i>
                  &nbsp;E-mail
                </ListGroupItem>
                <ListGroupItem href="https://www.linkedin.com/in/zelenkachris/" target="_blank">
                  <i className="fa fa-linkedin fa-fw"></i>
                  &nbsp;Linkedin
                </ListGroupItem>
                <ListGroupItem href="https://github.com/zelenkachris" target="_blank">
                  <i className="fa fa-github fa-fw"></i>
                  &nbsp;GitHub
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </div>
    );
  },

  componentDidMount() {
    $.ajax('/api/entries').done(function(data) {
      this.setState({entries: data});
    }.bind(this));
  }
});

export default BlogPage;
