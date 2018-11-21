import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home/HomePage';
import AdScreen from './components/AdScreen/AdScreen';
import PostAd from './components/PostAd/PostAd';
import LoginPage from './components/Login/LoginPage';
import AccountSettings from './components/AccountSettings/AccountSettings';
import Verification from './components/Verification/Verification';
import './App.css';

 var url = require('url');


import EventBus from 'eventing-bus';


const fetch = require('node-fetch');
const urlObj = url.parse(document.location.href, true);
const port = "" ;
const api_url = "https://celx-dev.herokuapp.com";
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

    EventBus.on("getAds", this.getAds.bind(this));
    EventBus.on("getEnums", this.getEnums.bind(this));
    EventBus.on("getBrands", this.getBrands.bind(this));
    EventBus.on("getAdDetails", this.getAdDetails.bind(this));

    EventBus.on("getMobileSpecs", this.getMobileSpecs.bind(this));
    EventBus.on("getAccessories", this.getAccessories.bind(this));
    EventBus.on("searchFilters", this.searchFilters.bind(this));
    EventBus.on("searchLocation", this.searchLocation.bind(this));
    EventBus.on("searchKeyword", this.searchKeyword.bind(this));
    EventBus.on("getConditions", this.getConditions.bind(this));
    EventBus.on("getPhysical", this.getPhysical.bind(this));

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

  getMobileSpecs(brand_id){

  console.log("brand id received is",brand_id);
  var request = require("request");
  EventBus.publish("showLoading")

  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/getMobileSpecs'
  var options = { method: 'POST',
    url: urlPath,
    headers:
     { 'Cache-Control': 'no-cache',
       'Content-Type': 'application/json',
       Authorization: localStorage.getItem('JWT'),},
    body: brand_id,
    json: true };

console.log("Call", options);

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log("Models Received", body.result);

  if (body.result)
  {
    localStorage.setItem('Models', JSON.stringify(body.result));

    EventBus.publish("ModelsReceived")

  }  else{
      console.log("API Result NOT Found");
    }

    EventBus.publish("stoploading")

    });

  }


  getAdDetails(advert_id){

    console.log("advert_id", advert_id);
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/getAdvertismentDetatils'

  var options = { method: 'POST',
    url: urlPath,
    headers:
     { 'Cache-Control': 'no-cache',
       'Content-Type': 'application/json' },
    body: advert_id,
    json: true };

console.log("Call", options);

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log("Ad Received", body.result);

      if (body.result)
      {
        var id = body.result._id
        localStorage.setItem('AD-'+id, JSON.stringify(body.result));

        EventBus.publish('AD-'+id,  body.result)

      }  else{
          console.log("API Result NOT Found");
        }


    });

  }
  getConditions(){

  console.log("getting conditions in app.js",);
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/getAllConditions'
  var options = { method: 'POST',
    url: urlPath,
    headers:
     { 'Cache-Control': 'no-cache',
       'Content-Type': 'application/json',
       Authorization: localStorage.getItem('JWT'),
     },
    body: {},
    json: true };

console.log("Call", options);

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log("Conditions Received", body.result);

      if (body.result)
      {
        var id = body.result._id
        localStorage.setItem('Conditions', JSON.stringify(body.result));
        console.log("Conditions set")
        EventBus.publish('Conditions',  body.result)

      }  else{
          console.log("API Result NOT Found");
        }


    });

  }

  getAccessories(){

  console.log("getting accessories in app.js",);
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/getAllPhysicalIssues/accessories'
  var options = { method: 'POST',
    url: urlPath,
    headers:
     { 'Cache-Control': 'no-cache',
       'Content-Type': 'application/json',
       Authorization: localStorage.getItem('JWT'),
     },
    body: {},
    json: true };

    console.log("Call", options);

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log("Accessories Received", body.result);
      if (body.result)
      {
        var id = body.result._id
        localStorage.setItem('Accessories', JSON.stringify(body.result));
        console.log("Accessories Received", localStorage.getItem('Accessories'));

        EventBus.publish('Accessories',  body.result)
      }  else{
          console.log("API Result NOT Found");
        }
    });
  }
  getPhysical(){

  console.log("getting PhysicalConditions in app.js",);
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/api/getAllPhysicalIssues/issues'
  var options = { method: 'POST',
    url: urlPath,
    headers:
     { 'Cache-Control': 'no-cache',
       'Content-Type': 'application/json',
       Authorization: localStorage.getItem('JWT'),
     },
    body: {},
    json: true };

    console.log("Call", options);

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log("Physical Received", body.result);
      if (body.result)
      {
        var id = body.result._id
        localStorage.setItem('PhysicalConditions', JSON.stringify(body.result));
        EventBus.publish('PhysicalConditions',  body.result)
      }  else{
          console.log("API Result NOT Found");
        }
    });
  }
  placeAdd(type, brandName, deviceDetails, imei, title, price, description, color, storage, condition, age){
    console.log("DAta for place add received");
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/placeAdd'

    var options = { method: 'POST',
    url: urlPath,
    headers:
    { 'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('JWT'),},
    body: {type:type,
          brandName:brandName,
          deviceDetails: deviceDetails,
          imei: imei,
          title: title,
          price: price,
          description: description,
          color: color,
          storage: storage,
          condition: condition,
          age: age
},
    json: true };

    console.log("Call", options);

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log("result Received", body.result);

      if (body.result)
      {
        var id = body.result._id
        localStorage.setItem('AdPosted', JSON.stringify(body.result));

      }  else{
        console.log("API Result NOT Found");
      }


    });

  }
  getBrands()
  {

    var userId = ""
    if (localStorage.getItem("userId") != null)
    {
      userId = localStorage.getItem("userId")
      console.log("Found User: ", userId);
    }

    var request = require("request");


    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port +  '/getMobileBrands'

    console.log("Calling", urlPath);
    var options = { method: 'POST',
      url: urlPath,
      headers:
       { 'Cache-Control': 'no-cache',
         'Content-Type': 'application/json' },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log("All Brands Received", body.result);
      localStorage.setItem('brands', JSON.stringify(body.result));

      EventBus.publish("brandsReceived", true)

    });

  }

  getEnums()
  {

    var userId = ""
    if (localStorage.getItem("userId") != null)
    {
      userId = localStorage.getItem("userId")
      console.log("Found User: ", userId);
    }

    var request = require("request");

    var urlPath = urlObj.protocol + '//' + urlObj.hostname+ this.port + "/getEnums"//urlObj.protocol + '//' + urlObj.hostname+ this.port + '/getEnums'

console.log("Calling", urlPath);
    var options = { method: 'POST',
      url: urlPath,
      headers:
       { 'Cache-Control': 'no-cache',
         'Content-Type': 'application/json' },
      body: { user_id: userId },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log("Enums Received", body.result);
      localStorage.setItem('enums', JSON.stringify(body.result));

      EventBus.publish("enumsReceived", true)

    });

  }


  callApi = async () => {
      const response = await fetch('/searchFilter');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    };

  getAds() {
    EventBus.publish("showLoading")
    this.json = {}
    if (localStorage.getItem("type") != undefined)
    {
      this.json.type = localStorage.getItem("type")
    }
    else {
      this.json.type = "mobile"
    }
    console.log("Getting Ads for Json", this.json);
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/searchFilter'

    console.log("Calling", urlPath);
    var options = { method: 'POST',
      url: urlPath,
      headers: { 'Cache-Control': 'no-cache' },
      body: this.json,
      json: true };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log("Results Received", body.result);
      if (body.result.length == 0 && localStorage.getItem('adsResult') == '')
      {
        localStorage.setItem('adsResult', []);
      }
      else {
        localStorage.setItem('adsResult', JSON.stringify(body.result));
      }
      EventBus.publish("adResult", true)
      EventBus.publish("stopLoading")
    });

  }
  searchFilters(brandName,priceStart,priceEnd,type){
  EventBus.publish("showLoading")
  console.log("getting filters in app.js",);
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/searchFilter'
  console.log(brandName)
  console.log(priceStart)
  console.log(priceEnd)
  // fetch(urlPath, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body:{
  //     brandName
  //   },
  //   json: true
  // })
  //     .then(res => {
  //       return res;
  //       res.json()})
  //     .then(
  //       (result) => {
  //         console.log("Results Received", result);
  //         this.setState({
  //           isLoaded: true,
  //         });
  //       },
  //       (error) => {
  //         console.log(error);
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  if(brandName != null && brandName != undefined && brandName != ''){
    this.searchjson = brandName;
  }
  var keyword = localStorage.getItem('searchkeyword');
  console.log(keyword)
  console.log(this.searchjson)

  var options = { method: 'POST',
  url: urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/searchFilter',
  headers:
  { 'Cache-Control': 'no-cache'
  },
  body: {brandName:this.searchjson.brandName, type:this.searchjson.type, priceEnd:this.searchjson.priceEnd, priceStart:this.searchjson.priceStart, keyword:this.searchjson.keyword},
  json: true };

  console.log("Call", options);
  request(options, (error, response, body) => {
    if (error) {
      console.log("error : ",error)
    }
    console.log("Results Received", body.result);
    if (body.result.length == 0 && localStorage.getItem('adsResult') == '')
    {
      localStorage.setItem('adsResult', []);
    }
    else {
      localStorage.setItem('adsResult', JSON.stringify(body.result));
    }
    localStorage.removeItem('keyword');
    EventBus.publish("adResult", true)
    EventBus.publish("stopLoading")
    });
    }

    searchKeyword(){

    console.log("getting filters in app.js",);
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/searchFilter'
    // if(brandName != null && brandName != undefined && brandName != ''){
    //   var searchjson = brandName;
    // }
    var keyword = localStorage.getItem('searchkeyword');
    if(keyword != null && keyword != undefined && keyword != ''){
      console.log(keyword)
      this.searchjson['keyword'] = keyword;
      console.log("after adding keyword",this.searchjson)

    }
    console.log(this.searchjson)
    var options = { method: 'POST',
    url: urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/searchFilter',
    headers:
    { 'Cache-Control': 'no-cache'
    },
    body: {brandName:this.searchjson.brandName, type:this.searchjson.type, priceEnd:this.searchjson.priceEnd, priceStart:this.searchjson.priceStart, keyword:this.searchjson.keyword},
    json: true };

    console.log("Call", options);
    request(options, (error, response, body) => {
      if (error) {
        console.log("error : ",error)
      }
      console.log("Results Received", body.result);
      if (body.result.length == 0 && localStorage.getItem('adsResult') == '')
      {
        localStorage.setItem('adsResult', []);
      }
      else {
        localStorage.setItem('adsResult', JSON.stringify(body.result));
      }
      localStorage.removeItem('keyword');
      EventBus.publish("adResult", true)
      });
      }

      searchLocation(lat,lng,distance){
      console.log("app js search locaation",this.searchjson)

      console.log("getting locations in app.js", lat);

      var request = require("request");
      var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/searchFilter'
      // if(brandName != null && brandName != undefined && brandName != ''){
      //   var searchjson = brandName;
      // }
      var location = localStorage.getItem('searchLocation');
      this.searchjson.lat = lat.lat;
      this.searchjson.lng = lat.lng;
      this.searchjson.distance = parseInt(lat.distance);
      console.log("after adding locations",this.searchjson)

      var options = { method: 'POST',
      url: urlObj.protocol + '//' + urlObj.hostname+ this.port  + '/searchFilter',
      headers:
      { 'Cache-Control': 'no-cache'
      },
      body: {lat:lat.lat, lng:lat.lng, distance:parseInt(lat.distance), brandName:this.searchjson.brandName, type:this.searchjson.type, priceEnd:this.searchjson.priceEnd, priceStart:this.searchjson.priceStart,keyword:this.searchjson.keyword},
      json: true };

      console.log("Call", options);
      request(options, (error, response, body) => {
        if (error) {
          console.log("error : ",error)
        }
        console.log("Results Received", body.result);
        if (body.result.length == 0 && localStorage.getItem('adsResult') == '')
        {
          localStorage.setItem('adsResult', []);
        }
        else {
          localStorage.setItem('adsResult', JSON.stringify(body.result));
        }
        localStorage.removeItem('keyword');
        EventBus.publish("adResult", true)
        });
        }


  render() {
    return (


      // <LoginPage />

      <Router>
        <div className="App">

          <div className="Overlay">
            <div className="AllPages">
              <Route exact path="/" component={Home} />
              <Route exact path="/ad/:id" component={AdScreen} />
              <Route exact path="/postad" component={PostAd} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/accounts" component={AccountSettings} />
              <Route exact path="/accounts/:id" component={AccountSettings} />
              <Route exact path="/verification" component={Verification} />
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
