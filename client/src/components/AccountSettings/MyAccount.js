import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


var url = require('url');
import './AccountSettings.css';

const urlObj = url.parse(document.location.href, true);
const port = "" ;

class MyAccount
 extends Component {

   profilePicture = []
   username = "Danial"
   userdetails = []
   UserDetailsContent= []
   packagedetails=[]
   name = []
   email = []
   mobile = []
   currency = []
  componentDidMount() {
    EventBus.publish("showLoading")
    this.getUserDetails();

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

  getUserDetails(){
    EventBus.publish("showLoading")
    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/getUserDetails'

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
        this.userdetails = body.result;
        console.log("result Received", body.result);
        this.showuserdetails();
      }else{
        console.log("API Result NOT Found");
      }
    });

  }

  showuserdetails(){
    var user = this.userdetails
    console.log(user)
    var userdets = []

    for (var key in user) {
      userdets.push(
        <div>

          <div className="deviceDetailsKey DeviceName">{key}</div>
          <div className="deviceDetailsValue DeviceName">{user[key]}</div>

        </div>
      )
      console.log(key,  user[key]);

    }
    this.UserDetailsContent = userdets
    this.packagedetails = this.userdetails.package
    this.name = this.userdetails.name
    this.email = this.userdetails.email
    this.mobile = this.userdetails.mobile
    this.currency = this.userdetails.currency
    console.log(this.name, this.email ,this.mobile ,this.currency)

    console.log(this.packagedetails)
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })
  EventBus.publish("stopLoading")
  
  }

  render(){
    return (


      <div className="MyAccount">
      <div className="MyProfile fontRegular">

      <div className="img_div">
      <Image className={"user_img"} height="80" width="80" src="/img/Add.jpg" />
      </div>
      <b className={"name"}>
      {this.username}
      </b>

      <div className="upload_image">
      <label for="file">
      <input id="file" type="file" style={{display:"none"}} name="userFile" accept=".png,.gif,.jpeg,.jpg" onChange={(e) =>this.handleFileInput(e)} />
      <Image src="/img/camera.png" height="30" width="30" />
      </label>
      </div>
      <div className="for_text">PNG or JPG, Maximum size 5MB.
      <span className="package_name">
      {this.packagedetails.name}
      <span className="upgrade"> &nbsp; Upgrade </span> </span>
      </div>
      <div className="packae_bar">
      <Image className={"bar"} src={this.packagedetails.picture} />
      </div>

      <div className="box" >
      <div className="userKeys users_details">Name </div>
      <div className="userValue users_details">{this.name}</div>
      <div className="userKeys users_details">Email </div>
      <div className="userValue users_details">{this.email}</div>
      <div className="userKeys users_details">Phone Number </div>
      <div className="userValue users_details">{this.mobile}</div>
      <div className="userKeys users_details">Currency</div>
      <div className="userValue users_details">{this.currency}</div>
      </div>
      </div>
      </div>

    )}

}

export default MyAccount;
