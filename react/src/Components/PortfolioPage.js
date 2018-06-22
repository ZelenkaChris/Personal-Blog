import React from 'react';
import {Jumbotron, ListGroup, ListGroupItem} from 'reactstrap';
import './PortfolioPage.css'

export default class PortfolioPage extends React.Component{
  render() {
    return(
      <div className="container" id="content">
        <Jumbotron className="text-center">
          <h1>Portfolio</h1>
        </Jumbotron>
        <ListGroup className="port_links">
          <ListGroupItem tag="a" href="http://www.zelenkachris.com:3001/cs160" target="_blank">
            <h3>Educational Activities Aggregated Search</h3>
            <p>Web site created for a Software Engineering class project with a group of 6. Activities were scraped from 4 different webpages using JSoup and compiled into an .sql file. Scraped data are then queried through aggregated search.</p>
            <small className="text-muted text-center"><p>Utilized: MySQL, PHP, Java and bitbucket.</p></small>
          </ListGroupItem>
          
          <ListGroupItem tag="a" href="http://www.zelenkachris.com:3001/iidx" target="_blank">
            <h3>IIDX Score Tracker</h3>
            <p>Personal web application created to keep track of my improved scores over time for a game called 'Beatmania IIDX'. Due to other score tracking sites not showing detailed statistics, it was hard to players to keep track of their improvements.</p>
            <small className="text-muted text-center"><p>Utilized MySQL, PHP and Python.</p></small>
          </ListGroupItem>
        
          <ListGroupItem tag="a" href="http://www.zelenkachris.com/pages/game/" target="_blank">
            <h3>3D Game</h3>
            <p>Simple 3D (Shoot-em up style) game I created using Three.js library for a Computer Graphics class.</p>
            <small className="text-muted text-center"><p>Utilized Three.js and Javascript.</p></small>
          </ListGroupItem>

          <ListGroupItem tag="a" href="http://www.zelenkachris.com/pages/ASTROv3noSound/" target="_blank">
            <h3>Apollo Mission Simulator</h3>
            <p>Simulation of the first Manned flight to the Moon (Apollo 8). This project was presented for an Astrology class.</p>
            <small className="text-muted text-center"><p>Utilized Three.js and Javascript.</p></small>
          </ListGroupItem>

          <ListGroupItem tag="a" href="https://github.com/ZelenkaChris/Minesweeper" target="_blank">
            <h3>Android Minesweeper Game</h3>
            <p>Minesweeper application was created to test and experiment with Android frameworks. With a partner, coded the games engine, options for users to change difficulty, and leaderboard system.</p>
            <small className="text-muted text-center"><p>Utilized Android SDK, Java and Git.</p></small>
          </ListGroupItem>

        </ListGroup>
      </div>
    )
  }
}