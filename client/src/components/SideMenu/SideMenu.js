import React, { Component } from 'react';
// import MenuItem from './MenuItem'
import { Image } from 'react-bootstrap';
import { withRouter, History, BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventBus from 'eventing-bus';

import './SideMenu.css';

class SideMenu extends Component {
myads = []
purchases = []
messages = []
offer = []
favourites = []
help = []
home = []
accountsettings = []


  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.selected = []
    console.log(this.selected);
    if(this.props.match.params.id == "MyAds"){
      console.log("MyAds")
      this.myads = {
        color: '#156dbf'
      };
    }else if(this.props.match.params.id == "MyPurchases"){
      console.log("MyPurchases")
      this.purchases = {
        color: '#156dbf'
      };
    }
    else if(this.props.match.params.id == "Home"){
      console.log("Home")
      this.home = {
        color: '#156dbf'
      };
    }else if(this.props.match.params.id == "Messages"){
      console.log("Messages")
      this.messages = {
        color: '#156dbf'
      };
    }else if(this.props.match.params.id == "Offers"){
      console.log("Offers")
      this.offer = {
        color: '#156dbf'
      };
    }else if(this.props.match.params.id == "Favourites"){
      console.log("Favourites")
      this.favourites = {
        color: '#156dbf'
      };
    }else if(this.props.match.params.id == "Help"){
      console.log("Help")
      this.help = {
        color: '#156dbf'
      };
    }else if(this.props.match.params.id == "AccountSettings"){
      console.log("MyAccount")
      this.accountsettings = {
        color: '#156dbf'
      };
    }else{
      this.myads = {
      color: '#156dbf'
      };
    }

    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
  }


  switchpage = (page) =>
  {
    var url = "/accounts/" + page
    console.log("Value", page);
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })

    console.log("props", this.props.match.params.id);
    window.location.reload();
    this.props.history.push(url)
  }

  render() {

    return(
      <div className="SideMenu">
        <div>
        <Link to={"/"}>
        <div className="fontSemiBold backBtn SideMenuLogo">Back to Home</div>
        </Link>
        </div>
        <div className="Menu">
        <div className="menuitems" style={this.myads} onClick={ () => this.switchpage("MyAds") }> <Image className="ItemImage" src="/img/myads.png" /> My Ads</div>
        <div className="menuitems" style={this.purchases} onClick={ () => this.switchpage("MyPurchases") }> <Image className="ItemImage" src="/img/purchases.png" /> My Purchases</div>
        <div className="menuitems" style={this.messages} onClick={ () => this.switchpage("Messages") }> <Image className="ItemImage" src="/img/envelope.png" /> Messages</div>
        <div className="menuitems" style={this.offer} onClick={ () => this.switchpage("Offers") }> <Image className="ItemImage" src="/img/shopping.png" /> Offers</div>
        <div className="menuitems" style={this.favourites} onClick={ () => this.switchpage("Favourites") }> <Image className="ItemImage" src="/img/heart.png" /> Favourites</div>
        <div className="menuitems" style={this.help} onClick={ () => this.switchpage("Help") }> <Image className="ItemImage" src="/img/information.png" /> Help</div>
        <div className="menuitems" style={this.accountsettings} onClick={ () => this.switchpage("AccountSettings") }> <Image className="ItemImage" src="/img/settings.png" /> Account Settings</div>
        </div>
      </div>

    )}



}



export default withRouter(SideMenu);
