import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


var url = require('url');
import './AccountSettings.css';

const urlObj = url.parse(document.location.href, true);
const port = "" ;

class Offers
 extends Component {
   myaddsOffers = []
   myOffers = []
   Offers= []
   showadds = []
   noAdds = ""
  componentDidMount() {
    this.getmyOffers();
  }
  constructor(props){
  super(props)
  this.state = {
  };
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
  }


  getmyOffers(){
    EventBus.publish("showLoading")

        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/getAllOffersCreatedBySelf'

        var options = { method: 'POST',
        url: urlPath,
        headers:
        { 'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('JWT'),},
        body: {},
        json: true };

        console.log("Call", options);

        request(options,  (error, response, body)=> {
          if (error) throw new Error(error);
          if (body.result){
            this.Offers = body.result;
            console.log("result Received", body.result);
            this.displayOffers();
          }else{
            console.log("API Result NOT Found");
          }
        });
  }
  getmyAdsOffers(){
    EventBus.publish("showLoading")
        console.log("ports is", port)
        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ port + '/api/getMyAddsOffers'

        var options = { method: 'POST',
        url: urlPath,
        headers:
        { 'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('JWT'),},
        body: {},
        json: true };

        console.log("Call", options);

        request(options,  (error, response, body)=> {
          if (error) throw new Error(error);
          if (body.result){
            this.Offers = body.result;
            console.log("result Received", body.result);
            this.displayOffers();
          }else{
            console.log("API Result NOT Found");
            alert("No received Offers!");
            window.location.reload();

          }
        });
        EventBus.publish("stopLoading")
  }

  displayOffers(){
    var cc =[]
    this.Offers.forEach(function(i,idx,n){
      cc.push(

        <div className={"AdItem --aspect-ratio: 2/1;"} >
          <div className={"ImageSide"}>
          <Link to={"/ad/" + (i.advert_id._id)}>
            <Image className={"ImageSideImage"} src={i.advert_id.pictures}/>
            </Link>
          </div>

          <div className={"DescriptionSide fontRegular"}>

            <div className={"AdTitle fontSemiBold"}> {i.advert_id.title}

            </div>
            <div className={"AdDescription fontRegular"}> {i.advert_id.description} </div>
            <div className={"rightdiv fontRegular"}>
              <Image className={"storage_color_image"} src="/img/storage.png" /> <span style={{color:"#342d38", marginRight:"40px", marginLeft:"-1px", fontSize:"60%"}}> {i.advert_id.storage} </span>
            </div>
            <div className={"rightdiv fontRegular"}>
              <Image className={"storage_color_image"} src="/img/color.png" /><span style={{color:"#342d38", marginRight:"40px", fontSize:"60%"}}> {i.advert_id.color} </span>
            </div>

            <div className={"pricediv fontSemiBold"}>
            <span style={{marginLeft: "3px",fontSize:"80%", color:"#342d38"}}>{i.user_id.currency}</span> <span style={{marginLeft: "3px", fontSize:"130%", color:"#342d38"}}> {i.offered_price} </span>

            </div>
          </div>
        </div>
      )

    })
    console.log(cc)
    this.showadds = cc
    console.log(this.showadds)
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })
  EventBus.publish("stopLoading")

  }

  render(){
    return (


      <div className="Offers">
      <div className={"buttonsplacing"}>
      <button className={"BlueButt MyAdsoffs"} onClick={this.getmyOffers}>
      Sent
      </button> &nbsp; &nbsp;
      <button className={"BlueButt offersbyme"} onClick={this.getmyAdsOffers}>
      Received
      </button>
      </div>
      {this.showadds}
      </div>

    )}

}

export default Offers;
