import React, { Component } from 'react';
import MyNavbar from './Components/MyNavbar';
import ResumePage from './Components/ResumePage';
import PortfolioPage from './Components/PortfolioPage';
import BlogPage from './Components/BlogPage';
import {Switch, Route} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 1
    }
    this.handleTabs = this.handleTabs.bind(this);
  }

  handleTabs(eventKey) {
    this.setState({
      activeTab: eventKey
    });
  }
  
  render() {
    return (
        <div className="App">
          <MyNavbar />
          <div className="AppContent">
            <Switch>
              <Route exact path='/' component={BlogPage}/>
              <Route exact path='/portfolio' component={PortfolioPage}/>
              <Route exact path='/resume' component={ResumePage}/>
            </Switch>
          </div>
        </div>
    );
  }
}

export default App;