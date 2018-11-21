import React, { Component } from 'react';
import { withRouter, Redirect, History } from "react-router-dom";

import {  NavItem, Nav, NavDropdown,MenuItem, Navbar, Image  } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';



import './HomeHeaderBar.css'
// import './appp.css'
// import './vendor.css'
const options = ['Account Settings','Sign Out'];
const nav = {
  margin: 'auto',
  backgroundColor: '#156dbf',
  display: 'flex',
  marginTop: '0px',
  height: '40px',
  width: '100%',
  color: 'white'
};

const navLogo = {
  height: '70%',
};

const navTagline = {
  fontSize: '18px',
  height: '25px'
};

const navDropdown = {
  fontColoe: '#ffffff',
  height: '20px',
  width: '40%',
  color: 'white'
};



const navHeader = {
  display: 'flex',
  height: '40px',
  width: '30%',
  margin: '0px 0px 0px 0px',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'flex-end'
};

const navNav = {
  display: 'flex',
  height: '40px',
  width: '20%',
  margin: '0px 0px 0px 0px',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center'
};

const navLocationLogo = {
  padding: '5px',
  color: 'white',
  height: '27px',
  width: "27px"
};


const navLocationText = {
  marginLeft: '10px',
  color: 'white',
  height: '27px',
  verticalAlign: 'middle',
  marginTop: '10px',
  fontSize: '15px',
  fontWeight: '600'
};



const navPro = {
  display: 'flex',
  height: '40px',
  width: '23%',
  margin: '0px 0px 0px 0px',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center'
};


const navProfileLogo = {
  padding: '5px',
  color: 'white',
  height: '27px',
  width: "27px"
};


const navProfileText = {
  marginLeft: '10px',
  color: 'white',
  verticalAlign: 'middle',
  marginTop: '10px',
  fontSize: '15px',
  fontWeight: '400',
  height: '90%'
};



const navEmpty = {
  display: 'flex',
  height: '40px',
  width: '70%',
  margin: '0px 0px 0px 0px'
};


const navCart = {
  backgroundColor: '#ffffff',
  display: 'flex',
  width: '22%',
  margin: '0px 0px 0px 0px'
};

const cartTop = {

  backgroundColor: '#48aee5',
  display: 'flex',
  width: '22%',
  margin: '0px 0px 0px 0px',
  height: '40px',

}

var currentLocation = "None"

class HomeHeaderBar extends Component {


  name = "Login"
  toshow = []

  componentDidMount() {

    if (localStorage.getItem('user') != null)
    {
      var user = JSON.parse( localStorage.getItem('user') )
      this.name = user.name
    }
    if(localStorage.getItem('JWT') == '' || localStorage.getItem('JWT') == null || localStorage.getItem('JWT') == undefined){
      console.log("log out kro")
      this.toshow = <span style={navProfileText} onClick={this.gotoLogin.bind(this)}> {this.name} </span>
    }else{
      this.toshow = <Dropdown style={navProfileText} onChange={this.gotoLogin.bind(this)} options={options} placeholder={this.name} />
    }

    this.currentLocation = localStorage.getItem('location')
    this.setState((state, props) => {

      // props.buttonTitle = this.buttonTitle
      return {counter: state.counter + props.step};
    });

  }


  handleFormSubmit(e) {
    e.preventDefault();

    console.log("FORM SUBMIT!");

  }


  state = {
    toLogin: false
  }
  gotoLogin(e)
  {
    console.log(e.value)
    if(e.value == undefined){
      this.props.history.push("/login");
    }
    if(e.value == 'Account Settings'){
      this.props.history.push("/accounts");
    }else if(e.value == 'Sign Out'){
      this.props.history.push("/login");
    }
    //console.log("Changing State", this.History);



     //window.open("/login","_self")

     //this.props.history.push('/')
    //  browserHistory.push('/')
  }
  _onSelect(e){
    console.log(e.value)

    if(e.value == 'Account Settings'){

    }else if(e.value == 'Sign Out'){
      this.gotoLogin.bind(this)
    }
  }

  render() {

    if (this.state.toLogin)
    {
      console.log("Going to Login");
      Redirect('/')
    }
// onClick={this.gotoLogin.bind(this)}
// <Navbar.Text style={navProfileText}>
//   {this.name}
// </Navbar.Text>
    return (
      <div className="HeaderBar">

      <Navbar id="hello" style={nav}>

        <div style={navEmpty}></div>

        <Nav style={navPro}>
          <Image style={navProfileLogo} src="/img/contact.png"  />

        </Nav>



      </Navbar>
      </div>


    )
  }
}

export default  withRouter(HomeHeaderBar);
