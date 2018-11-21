import React, { Component } from 'react';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


var url = require('url');
import './AccountSettings.css';

const urlObj = url.parse(document.location.href, true);
const port = "" ;

class Favourites
 extends Component {

  myfavourites = []
  showfavourites = []
  sold = "-"
  soldContent = []

  componentDidMount() {
    this.getmyFavourites();
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

  getmyFavourites(){
    EventBus.publish("showLoading")

        var request = require("request");
        var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/getFavouriteAdds'

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
            this.myfavourites = body.result;
            console.log("result Received", body.result);
            EventBus.publish("showLoading")
            this.checkSold();
            EventBus.publish("stopLoading")

          }else{
            console.log("API Result NOT Found");
          }
        });
  }


  checkSold(){
    this.sold = this.myfavourites.sold;
    console.log("sold Received", this.sold);

    if(this.sold == true){
      var notAvailable = <div>
        <button className={"BlueButton PostButton"}>
        Sold
        </button>
        </div>

      this.soldContent = notAvailable
      console.log("????",this.soldContent);
      console.log("????",notAvailable);
    } else if(this.sold  == false){
      var isAvailable = <div>
        <button className={"BlueButton PostButton"}>
        Available
        </button>
        </div>
      this.soldContent = isAvailable
      console.log("????",this.soldContent);
      console.log("????",isAvailable);
    }
    this.displayfavourites();

    this.setState((state, props) => {
    return {counter: state.counter + props.step};

  })
  }

  displayfavourites(){
    var cc =[]
    this.myfavourites.forEach(function(i,idx,n){
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
            <span style={{marginLeft: "3px",fontSize:"80%", color:"#342d38"}}>{i.user_id.currency}</span> <span style={{marginLeft: "3px", fontSize:"130%", color:"#342d38"}}> {i.price.toFixed(2)} </span>

            </div>
          </div>
        </div>
      )

    })
    console.log(cc)
    this.showfavourites = cc
    console.log(this.showfavourites)
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })
  EventBus.publish("stopLoading")
  }



  render(){
    return (


      <div className="Favourites">
      {this.showfavourites}
      </div>

    )}

}

export default Favourites;
