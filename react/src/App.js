import React, { Component } from 'react';
import MyNavbar from './Components/MyNavbar';
import ResumePage from './Components/ResumePage';
import PortfolioPage from './Components/PortfolioPage';
import BlogPage from './Components/BlogPage';
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
        <MyNavbar 
          handleTabs={this.handleTabs}
          activeTab={this.state.activeTab} />
        {this.state.activeTab === 1 && <BlogPage />}
        {this.state.activeTab === 2 && <PortfolioPage />}
        {this.state.activeTab === 3 && <ResumePage />}
      </div>
    );
  }
}

export default App;
