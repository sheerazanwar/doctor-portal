import React, { Component } from 'react';
import HomeHeaderBar from '../HomeHeaderBar/HomeHeaderBar'
import FilterMenu from './FilterMenu'
import HomeBody from './HomeBody'

import EventBus from 'eventing-bus';

import './HomePage.css';

class HomePage extends Component {


  componentDidMount() {
  }

  componentDidUpdate() {
  }



  render() {
    return (



      <div className="HomePage">


        <HomeHeaderBar />

        <div className={'PageBody'}>

          <FilterMenu />
          <HomeBody />

        </div>
      </div>
    );
  }
}

export default HomePage;
