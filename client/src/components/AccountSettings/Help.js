import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


var url = require('url');
import './AccountSettings.css';

const urlObj = url.parse(document.location.href, true);
const port = "" ;

class Help
 extends Component {



  componentDidMount() {
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


  render(){
    return (


      <div className="Help">
      <div style={{fontSize:"200%"}}>
      Need Any Help ?
      </div>
      </div>

    )}

}

export default Help;
