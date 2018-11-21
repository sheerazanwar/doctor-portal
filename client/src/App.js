import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PostAd from './components/PostAd/PostAd';
import LoginPage from './components/Login/LoginPage';
import './App.css';

 var url = require('url');


import EventBus from 'eventing-bus';


const fetch = require('node-fetch');
const urlObj = url.parse(document.location.href, true);
const port = "" ;
const api_url = "";
const token = localStorage.getItem('JWT')



class App extends Component {
  searchjson= [];

  loading = false

  constructor(props) {
    super(props);

    this.loading = false

    this.port = process.env.PORT;

    if (urlObj.hostname.indexOf("localhost") > -1)
    {

      port = ":1339"
      this.port = ":1339"
    }
    else
    {

      port = ""
      this.port = ""
    }

    console.log("this.PORT", this.port);
    console.log("PORT", port);

    // EventBus.on("getAds", this.getAds.bind(this));
    // EventBus.on("getEnums", this.getEnums.bind(this));
    // EventBus.on("getBrands", this.getBrands.bind(this));
    // EventBus.on("getAdDetails", this.getAdDetails.bind(this));

    // EventBus.on("getMobileSpecs", this.getMobileSpecs.bind(this));
    // EventBus.on("getAccessories", this.getAccessories.bind(this));
    // EventBus.on("searchFilters", this.searchFilters.bind(this));
    // EventBus.on("searchLocation", this.searchLocation.bind(this));
    // EventBus.on("searchKeyword", this.searchKeyword.bind(this));
    // EventBus.on("getConditions", this.getConditions.bind(this));
    // EventBus.on("getPhysical", this.getPhysical.bind(this));

    EventBus.on("showLoading", this.showLoading.bind(this));
    EventBus.on("stopLoading", this.stopLoading.bind(this));


  }


  showLoading(msg){
    this.loading = true

    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
  }

  stopLoading(msg){
    this.loading = false

    if (msg != undefined)
    {alert(msg)}

    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
  }

  componentDidMount() {


    console.log("didMount", "App.js");


    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })


  }

  componentDidUpdate() {

  }


  render() {
    return (


      // <LoginPage />

      <Router>
        <div className="App">

          <div className="Overlay">
            <div className="AllPages">
              <Route exact path="/" component={PostAd} />
              <Route exact path="/patientdetails" component={PostAd} />
              <Route exact path="/login" component={LoginPage} />
            </div>
            <div className="loading"  hidden={!this.loading} >

            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
