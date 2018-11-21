import React, { Component } from 'react';
import { Panel, Form, FormGroup, FormControl, Button, InputGroup, Glyphicon } from 'react-bootstrap';
import EventBus from 'eventing-bus';
import { withRouter, Redirect, History } from "react-router-dom";

import './Verification.css';


var firebase = require("firebase/app");
var auth = require("firebase/auth");

 var url = require('url');
 const fetch = require('node-fetch');
 const urlObj = url.parse(document.location.href, true);
 const port = ""

class Verification extends Component {


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

  codeSent = false

  handleSMSCode = (event) => {


      console.log("Something missing");

  }

  OpenSmsForm=(e)=>
  {

    this.formContent = this.smsVerificationForm

    this.setState((state, props) => {
      return {counter: state.counter + props.step};
    })


  }



  smsSendingForm =
  <form id="signupForm" className="signupForm">
    <p className="FormName fontSemiBold">Account Verification</p>
    <p className="fontRegular">Please verify your account via SMS Verification</p>
    <br/>
    <FormGroup controlId="formName">
      <InputGroup>
        <FormControl
          required
          className="round fontRegular"
          type="phone"
          name="phone"
          onChange={this.handleChange}
          placeholder="Mobile Number"/>
      </InputGroup>

    </FormGroup>

    <div id="recaptcha-container" className="FirebaseCaptcha">
    </div>


    <FormGroup>
      <button id="Verification-button" type="button"  className="verificationButton fontRegular" onClick={this.sendSMSVerification} >Get Verification Code </button>
    </FormGroup>

  </form>


  smsVerificationForm = <form id="signupForm" className="signupForm">
    <p className="FormName fontSemiBold">Account Verification</p>
    <p className="fontRegular">Enter the code here</p>
    <br/>
    <FormGroup controlId="formName">
      <InputGroup>
        <FormControl
          required
          className="round fontRegular"
          type="code"
          name="code"
          onChange={this.handleChange}
          placeholder="Mobile Number"/>
      </InputGroup>

    </FormGroup>


    <FormGroup>
      <button type="button"  className="signinButton fontRegular" onClick={this.handleSMSCode.bind(this)}>Verify Code</button>
    </FormGroup>

    <div className="bottomDiv">

        <span>
        <a  onClick={this.OpenSmsForm} className="link fontSemiBold"> Resend SMS Code </a>
        </span>


      <br/><br/>
    </div>
  </form>

  formContent = this.smsSendingForm


  sendSMSVerification = (event) => {

    console.log("Phone Number:", this.state.phone);
    var phoneNumber = this.state.phone
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {


          console.log("Success");
          //window.confirmationResult = confirmationResult;

          this.codeSent = true

          // this.setState((state, props) => {
          //
          //   // props.buttonTitle = this.buttonTitle
          //   return {counter: state.counter + props.step};
          // });

        }).catch(function (error) {

          console.log("Error", error);
          alert(error)


        });

  }

  verifyCode = (event) => {

    var code = this.state.code

      window.confirmationResult.confirm(code).then(function (result) {
      // User signed in successfully.
      var user = result.user;
      // ...
      alert('Done')
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      // ...

      alert(error)
    });

  }

  componentDidMount()
  {
    var user = localStorage.getItem('user')
    if (user != null)
    {
      if (user.smsVerification)
      {
        this.gotoHome()
      }
      else {
        console.log("On This Verification Screen");
      }

    }
    else {
      this.gotoLogin()
    }
    console.log("didMount Complete");

    var config = {
        apiKey: "AIzaSyAmJXP-luQXB68lchXN2Wm9oe40MuxzHHI",
        authDomain: "celx-c64f9.firebaseapp.com",
        databaseURL: "https://celx-c64f9.firebaseio.com",
        projectId: "celx-c64f9",
        storageBucket: "celx-c64f9.appspot.com",
        messagingSenderId: "947615458866"
      };

      firebase.initializeApp(config);

      //firebase.auth().settings.appVerificationDisabledForTesting = true;
      var phoneNumber = "+923215878488"
      var testVerificationCode = "123456"
      firebase.auth().languageCode = 'ur';


      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');


       var appVerifier = new firebase.auth.RecaptchaVerifier('Verification-button', {
        'size': 'invisible',
        'callback': function(response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
          this.verifyCode()
        },
        'expired-callback': function() {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      });


      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // confirmationResult can resolve with the whitelisted testVerificationCode above.
          return confirmationResult.confirm(testVerificationCode)
        }).catch(function (error) {
          alert(error)
        });

  }


  handleChange = (event) => {


    this.setState({[event.target.name]: event.target.value});

  }


  gotoHome()
  {

    this.props.history.push("/");

  }

  gotoLogin()
  {

    this.props.history.push("/");

  }



  // InializeFirebase()
  // {
  //   console.log("Wait done");
  //   var config = {
  //       apiKey: "AIzaSyAmJXP-luQXB68lchXN2Wm9oe40MuxzHHI",
  //       authDomain: "celx-c64f9.firebaseapp.com",
  //       databaseURL: "https://celx-c64f9.firebaseio.com",
  //       projectId: "celx-c64f9",
  //       storageBucket: "celx-c64f9.appspot.com",
  //       messagingSenderId: "947615458866"
  //     };
  //
  //     firebase.initializeApp(config);
  //
  //     firebase.auth().languageCode = 'en';
  //     console.log("Firebase done", firebase);
  //     firebase.auth().useDeviceLanguage();
  //
  //
  //     //window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  //
  //
  //     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('verification-button', {
  //       'size': 'invisible',
  //       'callback': function(response) {
  //         // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         this.sendSMSVerification()
  //       }
  //     });
  //
  //
  // 
  //
  //
  // }




  render() {
    return (

      <div className="Verification">
        <div className="PageBody">

          <div className="LeftSide">
            <img className="LogoMain" src="/img/logo-white.png"/>
          </div>

          <div className="RightSide">


          <form id="signupForm" className="signupForm">
            <p className="FormName fontSemiBold">Account Verification</p>
            <p className="fontRegular">Please verify your account via SMS Verification</p>
            <br/>

            <div className="SMSPart" hidden={this.codeSent}>
            <FormGroup controlId="formName">
              <InputGroup>
                <FormControl
                  required
                  className="round fontRegular"
                  type="phone"
                  name="phone"
                  onChange={this.handleChange}
                  placeholder="Mobile Number"/>
              </InputGroup>

            </FormGroup>

            <FormGroup>
              <button id="verification-button" type="button"  className="verificationButton fontRegular" onClick={this.sendSMSVerification} >Get Verification Code </button>
            </FormGroup>
            </div>

            <div id="recaptcha-container" className="FirebaseCaptcha">
            </div>


            <div className="VerificationPart" hidden={!this.codeSent}>

                  <FormGroup controlId="formName">
                    <InputGroup>
                      <FormControl
                        required
                        className="round fontRegular"
                        type="code"
                        name="code"
                        onChange={this.handleChange}
                        placeholder="Verification Code"/>
                    </InputGroup>

                  </FormGroup>

                  <FormGroup>
                    <button id="Verification-button" type="button"  className="verificationButton fontRegular"  >Verify Code </button>
                  </FormGroup>
            </div>


          </form>

          </div>

        </div>
      </div>

    )}
  }

  export default withRouter(Verification);
