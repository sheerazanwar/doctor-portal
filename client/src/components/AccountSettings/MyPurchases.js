import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


var url = require('url');
import './AccountSettings.css';

const urlObj = url.parse(document.location.href, true);
const port = "" ;

class MyPurchases
 extends Component {
showadds =[]
mypurchases = []

  componentDidMount() {
    this.getmyPurchases();
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

  getmyPurchases(){
    EventBus.publish("showLoading")

        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/myPurchases'

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
            this.mypurchases = body.result;
            console.log("result Received", body.result);
            this.displayads();
          }else{
            console.log("API Result NOT Found");
          }
        });
  }

  displayads(){
    var cc =[]
    this.mypurchases.forEach(function(i,idx,n){
      cc.push(

        <div className={"AdItem --aspect-ratio: 2/1;"} >
          <div className={"ImageSide"}>
          <Link to={"/ad/" + (i._id)}>
            <Image className={"ImageSideImage"} src={i.pictures[0]}/>
            </Link>
          </div>

          <div className={"DescriptionSide fontRegular"}>

            <div className={"AdTitle fontSemiBold"}> {i.title}
            <Image className={"CheckedImage"} src="/img/checked.png" />

            </div>
            <div className={"AdDescription fontRegular"}> {i.description} </div>
            <div className={"rightdiv fontRegular"}>
              <Image className={"storage_color_image"} src="/img/storage.png" /> <span style={{color:"#342d38", marginRight:"40px", marginLeft:"-1px", fontSize:"60%"}}> {i.storage} </span>
            </div>
            <div className={"rightdiv fontRegular"}>
              <Image className={"storage_color_image"} src="/img/color.png" /><span style={{color:"#342d38", marginRight:"40px", fontSize:"60%"}}> {i.color} </span>
            </div>

            <div className={"pricediv fontSemiBold"}>
            <span style={{marginLeft: "3px",fontSize:"80%", color:"#342d38"}}>{i.user_id.currency}</span> <span style={{marginLeft: "3px", fontSize:"130%", color:"#342d38"}}> {i.price} </span>
            <div className={"edit"}> Edit This Ad </div>

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


      <div className="MyPurchases">
      {this.showadds}

      </div>

    )}

}

export default MyPurchases
;
