import React, { Component } from 'react';
import { Image, Form, FormGroup, FormControl,Button ,InputGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AdItem extends Component {
  mycurrency=[]
  favourites=[]
  componentDidMount(){
    if(localStorage.getItem('JWT') != undefined && localStorage.getItem('JWT') != ''){
      this.mycurrency = localStorage.getItem('currency')
    }else{
      this.mycurrency = 'USD'
    }
    if(this.props.ad.isFavourite == false){
      this.favourites = <img className="likeBtn" src="/img/no-like.png"/>
    }else{
      this.favourites = <img className="likeBtn" src="/img/yes-like.png"/>
    }
  }

  render() {

    return(
      <div className={"AdItem --aspect-ratio: 2/1;"} >
        <div className={"ImageSide"}>
        <Link to={"/ad/" + (this.props.ad._id)}>
          <img className={"ImageSideImage"} src={this.props.ad.pictures[0].replace(".mp4" , ".jpg")} />
          </Link>
        </div>

        <div className={"DescriptionSide fontRegular"}>
          <div className={"Boosted"} hidden={!this.props.ad.boosted} > Boosted</div><br />
          <Link to={"/ad/" + (this.props.ad._id)}>

          <div className={"AdTitle fontSemiBold"}> {this.props.ad.title.substring(0,16)+"..."} </div>
          </Link>

          <div className={"AdDescription fontRegular"}> {this.props.ad.description} </div>
          <div className={"rightdiv fontRegular"}>
            <Image className={"storage_color_image"} src="/img/storage.png" /> <span style={{color:"#342d38", marginRight:"40px", marginLeft:"-1px", fontSize:"60%"}}> {this.props.ad.storage} </span>
          </div>

          <div className={"rightdiv fontRegular"}>
            <Image className={"storage_color_image"} src="/img/color.png" /><span style={{color:"#342d38", marginRight:"40px", fontSize:"60%"}}> {this.props.ad.color}</span>
          </div>
          <div>
          {this.favourites}
          </div>
          <div className={"pricediv fontSemiBold"}>
          <span style={{marginLeft: "3px",fontSize:"80%", color:"#342d38"}}>{this.mycurrency}</span> <span style={{marginLeft: "3px", fontSize:"130%", color:"#342d38"}}>{this.props.ad.price}</span>
          </div>
        </div>
      </div>
    )
    }


}

export default AdItem;
