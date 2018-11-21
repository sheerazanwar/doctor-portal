import React, { Component } from 'react';
import HomeHeaderBar from '../HomeHeaderBar/HomeHeaderBar'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import EventBus from 'eventing-bus';
import { Image } from 'react-bootstrap';
import {Gallery} from '../Magnifier/index.js';
import ImageGallery from 'react-image-gallery';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



var url = require('url');
import './AdScreen.css';

const options = ['flag as fake','flag as sold','needs review'];
const urlObj = url.parse(document.location.href, true);
const port = "" ;

const GridItemImage= {
  height:  '500px',
  width: '500px',
  objectFit: 'scale-down',
  overflow: 'hidden'
}
class AdScreen extends Component {

  currentAd = {}
  currentDevice = {}
  currentUser = {}
  picturesContent = [<img src="https://www.cleartrip.com/hotels/assets/default-img.jpg"/>]
  deviceDetailsContent = []
  userImg = "https://www.planwallpaper.com/static/images/wallpaper-cool-hd-3d.jpg"
  accessories = "-"
  currentprice = "-"
  favContent = "-"
  favourite = "-"
  advert_id= "-"
  mycurrency =""

  getObjectByValue(array, key, value) {
    return array.filter(function (object) {
        return object[key] === value;
    });
    return -1
  };


  adReceived(adObject)
  {
      //Received

      this.currentAd =adObject
      this.fillVariables()
  }

  getAdDetailsFromAnywhere()
  {

    EventBus.publish("showLoading")
    if (this.props.match.params.id == null)
    {
      console.log("No Ad ID");
    }
    else
    {
      var ads = localStorage.getItem("adsResult")
      var json = JSON.parse(ads)
      console.log("All Ads", json);

      if (localStorage.getItem("AD-"+this.props.match.params.id) != null){
        this.currentAd = JSON.parse(localStorage.getItem('AD-'+this.props.match.params.id));
        console.log("Found Individual", ('AD-'+this.props.match.params.id));

          this.fillVariables()

      }
        else if(json != null && this.getObjectByValue(json, "_id", this.props.match.params.id) != -1)
      {
        var obj = this.getObjectByValue(json, "_id", this.props.match.params.id)[0]
        console.log("This Ad", obj);
        this.currentAd = obj
        if(this.currentAd == undefined || this.currentAd == ''){
          console.log("empty")
          this.props.history.push('/not-found')
        }

          this.fillVariables()
      }

      else
      {
          EventBus.on("AD-"+this.props.match.params.id, this.adReceived.bind(this));
          EventBus.publish("getAdDetails",  {advert_id: this.props.match.params.id})
      }

    }
    EventBus.publish("stopLoading")

  }

  fillVariables()
  {


    console.log("Id", this.props.match.params.id);


      var p = []

      console.log("currentAd", this.currentAd)
      this.currentAd.pictures.forEach(function(i,idx,n){

        p.push(<img src={i}/>)
        // p.push({ 'original': i})
      })
      this.picturesContent = p

      console.log("picture details", this.picturesContent);
      this.accessories = ""
      var aa = ""

      this.currentAd.accessories.forEach(function(i,idx,n){

        aa += (i.title+",")
      })

      if (aa == "")
      {
        this.accessories = "-"
      }
      else {
        this.accessories = aa
      }
      if(this.currentAd.price){
        this.currentprice = this.currentAd.price.toFixed(2);
      }

      console.log("accessories", this.accessories);

      var device = this.currentAd.deviceDetails;
      this.currentDevice = device;
      this.favourite = this.currentAd.isFavourite;
      this.advert_id = this.currentAd._id;
      console.log("Device Details", device);
      console.log("favourite Details", this.favourite);

      var aduser = this.currentAd.user_id
      this.currentUser = aduser
      console.log("User Details only", aduser);


      this.deviceDetailsContent = []

      for (var key in device) {

        this.deviceDetailsContent.push(
          <div style={{display: "flex"}}>
            <div className="deviceDetailsKey DeviceName">{key}</div>
            <div className="deviceDetailsValue fontRegular DeviceName">{device[key]}</div>

          </div>
        )
      }


      this.setState((state, props) => {
        console.log("Loading Pics");
      return {counter: state.counter + props.step};
    })


  }

  componentDidMount() {
    this.getAdDetailsFromAnywhere()
    this.checkFavourite()
    if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != ''){
      this.mycurrency = localStorage.getItem('currency')
    }else{
      this.mycurrency = 'USD'
    }

}
constructor(props){
super(props)
this.state = {
  result: ''
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

addfavourite=(e)=>{
  console.log("add favourites");
  console.log(this.favContent);
  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/addFavouriteAdds'
  var add= 'true';
  console.log(add);
  var options = { method: 'POST',
  url: urlPath,
  headers:
  { 'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('JWT'),},
  body: {
    advert_id:this.advert_id,
    add:add
},
  json: true };
  console.log("Call", options);

  request(options,  (error, response, body)=> {
    if (error) throw new Error(error);
    console.log(body)
    if (body.message){
      console.log("favourite changed", body.message);
      console.log("favourite changed", body.ad);
      localStorage.setItem('AD-'+this.advert_id, JSON.stringify(body.ad));
    }else{
      console.log("API Result NOT Found");
    }
  });
  this.favContent = this.isFavourite

  this.setState((state, props) => {
  return {counter: state.counter + props.step};
  })
}

removefavourite=(e)=>{
  console.log("remove favourites");
  this.favContent = this.notFavourite
  this.setState((state, props) => {
  return {counter: state.counter + props.step};
  })
}

  isFavourite = <div>
  <img className="likeBtn" src="/img/yes-like.png" onClick={this.removefavourite}/>
  </div>

  notFavourite = <div>
  <img className="likeBtn" src="/img/no-like.png" onClick={this.addfavourite}/>
  </div>

  checkFavourite(){
    if(this.favourite == true){
      this.favContent = this.isFavourite
    } else if(this.favourite  == false){
      this.favContent = this.notFavourite
    }
  }



  render(){
    const images = [
      {
        original: this.picturesContent[0],
        thumbnail: this.picturesContent,
        originalClass: 'GridItemImage',
        sizes:60,
      }
    ]
    console.log("images on the go",images);

    return (


      <div className="AdPage">

        <HomeHeaderBar />
        <div className={'PageBody'}>

          <div className="leftSide">
          <Link to={"/"}>
            <p className="fontSemiBold backBtn">Back to Home</p>
            </Link>
            <Carousel>
            {this.picturesContent}
            </Carousel>
              <div className="userInfo">
                <img className="userImageRound" src={this.currentUser.profilePicture} />
                <p className="fontRegular userNameText">{this.currentUser.name}</p>
                <p className="fontRegular userAreaText">DHA Islamabad</p>
              </div>
              <div className="report fontRegular">
              <Dropdown className='dropdown' options={options} onChange={this._onSelect} placeholder="Report this ad" />
              </div>

          </div>

          <div className="middleSide fontRegular">
            <p className=" fontSemiBold AdTitle">{this.currentAd.title}</p>
            <p className=" fontRegular AdDescription">{this.currentAd.description}</p>


            {this.favContent}

            <div className="fullLine fontRegular specsstorage">
              <img className="specsImg"  src="/img/storage.png" /> <span className="specsText fontRegular "> {this.currentAd.storage} </span>
            </div>
            <div className="fullLine fontRegular specscolor">
              <img className="specsImg" src="/img/color.png" /><span className="fontRegular specsText">  {this.currentAd.color}  </span>
            </div>

            <p className=" fontRegular AdDescription bottom"> - includes <span className="bold">{this.accessories}</span> </p>
            <p className=" fontRegular AdDescription bottom"> - used <span className="bold">{this.currentAd.age} Years</span> </p>


            <div className="fullLine fontRegular " >
              <button className="contactbutton" >
              <Image className="buttonpic" src="/img/message.png" />
            <span className="buttontext">  CONTACT </span>
              </button>
            </div>
            <div className="fullLine fontRegular " >
              <button className="buybutton" >
              <Image className="buttonpic" src="/img/cart.png" />
              <span className="buttontext"> BUY THIS </span>
              </button>
            </div>
            <div className={"fullLine fontSemiBold pricediv"}>
            <span className={"currency"}>{this.mycurrency}</span> <span className={"price"}>{this.currentprice}</span>
            </div>



          </div>

          <div className="fontRegular rightSide">
            <p className="fontRegular fontSemiBold fontRight DeviceName">{this.currentDevice.DeviceName}</p>

            {
              this.deviceDetailsContent
            }
          </div>


        </div>

      </div>

    )}

}

export default AdScreen;
