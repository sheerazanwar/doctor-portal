import React, { Component } from 'react';
import { Panel, Form, FormGroup, FormControl, Button, InputGroup, Glyphicon } from 'react-bootstrap';
import EventBus from 'eventing-bus';
import { withRouter, Redirect, History } from "react-router-dom";

import './LoginPage.css';


var firebase = require("firebase/app");
var auth = require("firebase/auth");

 var url = require('url');
 const fetch = require('node-fetch');
 const urlObj = url.parse(document.location.href, true);
 const port = ""

class LoginPage extends Component {


  constructor(props) {

    super(props);


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




}


  componentDidMount()
  {
    var user = localStorage.getItem('user')
    if (user != null)
    {
      var userJson = JSON.parse(user)
      if (userJson.smsVerification)
      {
        this.gotoHome()
      }
      else {
        this.gotoHome()
        //this.gotoVerification()
      }
    }
    console.log("didMount Complete");


  }


  handleChange = (event) => {

    this.setState({[event.target.name]: event.target.value});

  }


  gotoHome()
  {


    this.props.history.push("/");

  }

  gotoVerification()
  {


    this.props.history.push("/verification");

  }

  handleSignup = (event) => {

    //console.log("Login with ", this.state.email, this.state.password);
    if (this.state.signupName != null && this.state.signupEmail != null && this.state.signupPassword !=null && this.state.signupRetype !=null && this.state.signupPassword == this.state.signupRetype)
    {



    EventBus.publish("showLoading")

    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/register'

    var options = { method: 'POST',
        url: urlPath,
        headers:
         { 'Cache-Control': 'no-cache',
           'Content-Type': 'application/json' },
        body: {name: this.state.signupName, email: this.state.signupEmail, password: this.state.signupPassword},
        json: true };

    console.log("Call", options.url);

    request(options, (error, response, body) => {
      if (error) throw new Error(error);

      if (response.statusCode == 202)
      {
        localStorage.setItem('JWT', (body.token))
        localStorage.setItem('currency', (body.user.currency))
        localStorage.setItem('user', JSON.stringify(body.user))
        console.log("User Saved", body.user);

        EventBus.publish("stopLoading", "User Created")

        var user = body.user
        if (user.smsVerification){

        }
        else {
          this.gotoHome()
        }

      }
      else if (response.statusCode == 403){
        EventBus.publish("stopLoading", "Email is missing")
      }
      else if (response.statusCode == 409){
        EventBus.publish("stopLoading", "Email Alread in use")
      }
      else
      {
        EventBus.publish("stopLoading", "Network Issue")
      }

    })
    }
    else {
      console.log("Something missing");
    }
  }

  handleLogin = (event) => {

    //console.log("Login with ", this.state.email, this.state.password);
    if (this.state.email != null && this.state.password !=null)
    {



    EventBus.publish("showLoading")

    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/authenticate'

    var options = { method: 'POST',
        url: urlPath,
        headers:
         { 'Cache-Control': 'no-cache',
           'Content-Type': 'application/json' },
        body: {email: this.state.email, password: this.state.password},
        json: true };

    console.log("Call", options.url);

    request(options, (error, response, body) => {
      if (error) throw new Error(error);

      if (response.statusCode == 200)
      {
        localStorage.setItem('user', JSON.stringify(body.user))
        localStorage.setItem('JWT', (body.token))
        localStorage.setItem('currency', (body.user.currency))
        console.log("User Saved", body.user);
        console.log("User Saved", body.token);

        EventBus.publish("stopLoading")
        this.gotoHome()
      }
      else if (response.statusCode == 401){
        EventBus.publish("stopLoading", "Wrong Credentials")
      }
      else
      {
        EventBus.publish("stopLoading", "Network Issue")
      }

    })
    }
    else {
      console.log("Something missing");
    }
  }

  OpenSignupForm=(e)=>
  {

    console.log("register clicked", e.target.value );
    console.log("ev", e);
    this.rightContent = this.signupForm
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })

  }
  OpenSigninForm=(e)=>
  {

    console.log("register clicked", e.target.value );
    console.log("ev", e);
    this.rightContent = this.signinForm
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })

  }

  delay=(e)=> {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
  };

  InializeFirebase()
  {
    console.log("Wait done");
    var config = {
        apiKey: "AIzaSyAmJXP-luQXB68lchXN2Wm9oe40MuxzHHI",
        authDomain: "celx-c64f9.firebaseapp.com",
        databaseURL: "https://celx-c64f9.firebaseio.com",
        projectId: "celx-c64f9",
        storageBucket: "celx-c64f9.appspot.com",
        messagingSenderId: "947615458866"
      };

      firebase.initializeApp(config);

      firebase.auth().languageCode = 'en';
      console.log("Firebase done", firebase);
      firebase.auth().useDeviceLanguage();


      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');








  }

  OpenSmsForm=(e)=>
  {

    this.rightContent = this.smsVerificationForm

    this.setState((state, props) => {
      return {counter: state.counter + props.step};
    })


    setTimeout(function() {

      console.log("Wait done");
      var config = {
          apiKey: "AIzaSyAmJXP-luQXB68lchXN2Wm9oe40MuxzHHI",
          authDomain: "celx-c64f9.firebaseapp.com",
          databaseURL: "https://celx-c64f9.firebaseio.com",
          projectId: "celx-c64f9",
          storageBucket: "celx-c64f9.appspot.com",
          messagingSenderId: "947615458866"
        };

        firebase.initializeApp(config);

        firebase.auth().languageCode = 'en';
        console.log("Firebase done", firebase);
        firebase.auth().useDeviceLanguage();


        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');


      console.log("InializeFirebase");
    }, 3000);





  }

  smsVerificationForm = <form id="signupForm" className="signupForm">
    <p className="FormName fontSemiBold">Account Verification</p>
    <p className="fontRegular">Please verify your account via SMS Verification</p>
    <br/>
    <FormGroup controlId="formName">
      <InputGroup>
        <FormControl
          required
          className="round fontRegular"
          type="phone"
          name="signupName"
          onChange={this.handleChange}
          placeholder="Mobile Number"/>
      </InputGroup>

    </FormGroup>


    <div id="recaptcha-container" className="FirebaseCaptcha">
    </div>

    <FormGroup>
      <button type="button"  className="signinButton fontRegular" onClick={this.handleSignup.bind(this)}>Get SMS</button>
    </FormGroup>
    <div className="bottomDiv">
        <span  onClick={this.OpenSigninForm} className="darkgrey fontRegular">Go back to </span>
        <span>
        <a  onClick={this.OpenSigninForm} className="link fontSemiBold"> Sign In</a>
        </span>
        <br/>
        <br/>
        <span className=" fontRegular facebookBtn">
          Sign Up with Facebook
        </span>

      <br/><br/>
    </div>
  </form>


    signupForm = <form className="signupForm">
      <p className="FormName fontSemiBold">Sign Up</p><br/>
      <FormGroup controlId="formName">
        <InputGroup>
          <FormControl
            required
            className="round fontRegular"
            type="text"
            name="signupName"
            onChange={this.handleChange}
            placeholder="Full Name"/>
        </InputGroup>
      </FormGroup>
        <FormGroup controlId="formEmail">
          <InputGroup>
            <FormControl
              required
              className="round fontRegular"
              type="email"
              name="signupEmail"
              onChange={this.handleChange}
              placeholder="Email Address"/>
          </InputGroup>
        </FormGroup>

        <FormGroup controlId="formPassword">
          <InputGroup>
            <FormControl
              required
              className="round fontRegular"
              type="password"
              name="signupPassword"
              onChange={this.handleChange}
              placeholder="Password"/>
          </InputGroup>
        </FormGroup>

        <FormGroup controlId="formPassword">
          <InputGroup>
            <FormControl
              required
              className="round fontRegular"
              type="password"
              name="signupRetype"
              onChange={this.handleChange}
              placeholder="Confirm Password"/>
          </InputGroup>
        </FormGroup>

          <FormGroup>
        <button type="button"  className="signinButton fontRegular" onClick={this.handleSignup.bind(this)}>Sign Up</button>
      </FormGroup>
      <div className="bottomDiv">
          <span  onClick={this.OpenSigninForm} className="darkgrey fontRegular">Go back to </span>
          <span>
          <a  onClick={this.OpenSigninForm} className="link fontSemiBold"> Sign In</a>
          </span>
          <br/>
          <br/>
          <span className=" fontRegular facebookBtn">
            Sign Up with Facebook
          </span>

        <br/><br/>
      </div>
    </form>

    signinForm = <form className="signinForm">
        <p className="FormName fontSemiBold">Sign In</p><br/>
          <FormGroup controlId="formEmail">
            <InputGroup>
              <FormControl
                required
                className="round fontRegular"
                type="email"
                name="email"
                onChange={this.handleChange}
                placeholder="Email Address"/>
            </InputGroup>
          </FormGroup>

          <FormGroup controlId="formPassword">
            <InputGroup>
              <FormControl
                required
                className="round fontRegular"
                type="password"
                name="password"
                onChange={this.handleChange}
                placeholder="Password"/>
            </InputGroup>
          </FormGroup>
            <FormGroup>
          <button type="button" className="signinButton fontRegular" onClick={this.handleLogin.bind(this)}>Sign in</button>
        </FormGroup>

        <div>
          <span>
            <a className="link fontRegular" href="#terms">Forgot password?</a>
          </span>
          <br/><br/>
            <span  onClick={this.OpenSignupForm} className="darkgrey fontRegular">Dont have an Account? </span>
          <span>
            <a className="link fontSemiBold" onClick={this.OpenSignupForm}> Sign Up</a>
            </span>
          <br/>
          <br/>
          <span className=" fontRegular facebookBtn">
            Sign In with Facebook
          </span>
        </div>

      </form>


  rightContent = this.signinForm

  render() {
    return (

      <div className="LoginPage">
        <div className="PageBody">

          <div className="LeftSide">
            <img className="LogoMain" src="/img/logo-white.png"/>
          </div>

          <div className="RightSide">
            {this.rightContent}
          </div>

        </div>
      </div>

    )}
  }

  export default withRouter(LoginPage);
