import React, { Component } from 'react';
import HomeHeaderBar from '../HomeHeaderBar/HomeHeaderBar'
import EventBus from 'eventing-bus';
import { Image,Glyphicon,InputGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Accordion, AccordionItem } from 'react-sanfona';
import FileInput  from 'react-file-input';
import Checkbox from 'rc-checkbox';
import PropTypes from 'prop-types';

var url = require('url');
import './PostAd.css';

const manuCallback = function(object) {}
const fetch = require('node-fetch');
const urlObj = url.parse(document.location.href, true);
const port = "" ;
var searcharea = []
var lat = []
var lng = []
var accesschecks = [];
var accessfinalCheck = [];
var physchecks = [];
var physfinalchecks = [];
var phoneswitch = '';

function phonedeadcheck(e){
if(e.target.checked == true){
  phoneswitch = true;
  console.log('Checkbox checked:', phoneswitch);
}else if(e.target.checked == false){
  phoneswitch = false;
  console.log('Checkbox checked:', phoneswitch);
}
}
function onChangeaccess(e) {
  console.log('Checkbox checked:', (e.target.checked));
  console.log('Checkbox checked:', (e.target.value));
  if(e.target.value == -1){
    console.log(e.target.value)
  }
  console.log(accesschecks);
  if(e.target.checked == true){
    // checks = checks.concat(e.target.value);
    accesschecks.push(e.target.value);
    console.log('final checked:', accesschecks);
  } else if(e.target.checked == false){
    //checks.pull(e.target.value);
    console.log("in false")
    accessfinalCheck = [];
    accesschecks.forEach(function(i,idx,x){
      console.log(i , e.target.value)
      if(i+"" == e.target.value+""){
        console.log("matched")
      }else{
        accessfinalCheck.push(i);
      }
      if(idx == x.length-1){
        accesschecks = accessfinalCheck;
        console.log("final check : ", accessfinalCheck);
        console.log(accesschecks);
      }
    })
//    checks.splice(e.target.value );
    console.log('final checked:', accesschecks);
  }
  console.log('final checked:', accesschecks);

}

function onChangePhysical(e) {
  console.log('Checkbox checked:', (e.target.checked));
  console.log('Checkbox checked:', (e.target.value));
  if(e.target.value == -1){
    console.log(e.target.value)
  }
  console.log(physchecks);
  if(e.target.checked == true){
    // checks = checks.concat(e.target.value);
    physchecks.push(e.target.value);
    console.log('final checked:', physchecks);
  } else if(e.target.checked == false){
    console.log("in false")
    physfinalchecks = [];
    physchecks.forEach(function(i,idx,x){
      console.log(i , e.target.value)
      if(i+"" == e.target.value+""){
        console.log("matched")
      }else{
        physfinalchecks.push(i);
      }
      if(idx == x.length-1){
        physchecks = physfinalchecks;
        console.log("final check : ", physfinalchecks);
        console.log(physchecks);
      }
    })
    console.log('final checked:', physchecks);
  }
  console.log('final checked:', physchecks);

}


class PostAd extends Component {

  medicine_forms = [
    {"name":"Tablet", "value": 1},
    {"name":"Capsule", "value": 2},
    {"name":"Drops", "value":3},
    {"name":"inhalers", "value":4},
    {"name":"Syrup", "value":5},
    {"name":"Injections", "value":5},
    {"name":"Implants", "value":6},
    {"name":"Patches", "value":7},
    {"name":"Ointment", "value":8},
    {"name":"Cream", "value":9}
  ];
  brandsData = []
  categoriesData = []
  colorData = []
  storageData = []
  conditionsData = []
  accessoriesData = []
  physicalData = []
  modelsData= []
  agenames = []
  newad_id= []
  mycurrency ="-"
  displaylocaccord = []
  displayverifyaccord = []
  forverification = []
  verify_display = []
  file = []
  adtitle = []
  title = []
  json_add =[]
  add_medicines = []
  add_medicines1 = []
  priscription_details = []
  medicine_view = []
  add_form = []
  medicine_formsdata = []
  patient_data = []
  age = [
    {"name":"Brand New", "count": -1},
    {"name":"Less Than a Year", "count": 0},
    {"name":"1 Year", "count":1},
    {"name":"2 Years", "count":2},
    {"name":"3 Years", "count":3},
    {"name":"4 Years", "count":4},
    {"name":"5 Years", "count":5},
    {"name":"6 Years", "count":6},
    {"name":"7 Years", "count":7},
    {"name":"Greater Than 7", "count":8}
];

  brandsReceived()
  {

    var brands;

    if (localStorage.getItem("brands") != null)
    {

      brands = JSON.parse(localStorage.getItem("brands"))

      console.log("brands", JSON.parse(localStorage.getItem("brands")));
        var bb = []

        brands.forEach(function(i,idx,n){

          bb.push(
          <option placeholder="" className="name" value={i._id}> {i.brandName}</option>
        )

        })

        this.brandsData = bb
        console.log("brands founr are",this.brandsData);
    }


    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
  }

  data_for_priscription =() =>{

        var ag = []
        var forms = this.medicine_forms
        console.log(this.medicine_forms);
        forms.forEach((i,idx,n) =>{
          EventBus.publish("showLoading")

          ag.push(
          <option className="name" value={i.value}>
          {i.name}
          </option>
          )
          EventBus.publish("stopLoading")

        })

        console.log(this.medicine_formsdata);
        this.medicine_formsdata = ag
        this.setState((state, props) => {
        return {counter: state.counter + props.step};
        })
  }


  getCond_Acc_phy()
  {
    // EventBus.publish("getAccessories");
    // EventBus.publish("getPhysical");
    // EventBus.publish("getConditions");
    // console.log("conditions in postad.js")
    // var conditions;
    // var accessories;
    // var physical;
    //
    //   console.log("conditions in postad.js ((IF))")
    //   conditions = JSON.parse(localStorage.getItem("Conditions"))
    //   accessories = JSON.parse(localStorage.getItem("Accessories"))
    //   physical = JSON.parse(localStorage.getItem("PhysicalConditions"))
    //   console.log("conditions", conditions);
    //   console.log("accessories", accessories);
    //   console.log("physical", JSON.parse(localStorage.getItem("PhysicalConditions")));
    //
    //     var con = []
    //     var acc = []
    //     var phy = []
    //
    //     accessories.forEach(function(i,idx,n){
    //       acc.push(
    //         <p><label >
    //         <Checkbox name="my-checkbox" onChange={onChangeaccess} value={i._id} />
    //         <span className="name"> {i.title}</span>
    //         </label></p>
    //       )
    //     })
    //     physical.forEach(function(i,idx,n){
    //       phy.push(
    //         <p><label >
    //         <Checkbox name="my-checkbox" onChange={onChangePhysical} value={i._id} />
    //         <span className="name"> {i.title}</span>
    //         </label></p>
    //       )
    //     })
    //     this.physicalData = phy
    //     this.accessoriesData = acc
    //     this.conditionsData = con
  }

  EnumsReceived()
  {
    //
    // var enums;
    //
    // if (localStorage.getItem("enums") != null)
    // {
    //
    //   enums = JSON.parse(localStorage.getItem("enums"))
    //
    //   console.log("enums", JSON.parse(localStorage.getItem("enums")));
    //
    //     // var category = this.enums.category;
    //     // console.log("Category Details", category);
    //     var category = enums.category
    //     console.log("categories" , category)
    //     var color = enums.color
    //     console.log("colors" , color)
    //     var storage = enums.storage
    //     console.log("storage" , storage)
    //     var cc = []
    //     var col = []
    //     var sto = []
    //     var ag = []
    //
    //     category.forEach(function(i,idx,n){
    //       cc.push(
    //       <option className="name" value={i.name} >
    //       <img src="i.image" class="images"/>
    //       {i.name}
    //       </option>
    //       )
    //
    //     })
    //     color.forEach(function(i,idx,n){
    //       col.push(
    //       <option className="name" value={i}>
    //       {i}
    //       </option>
    //       )
    //
    //     })
    //     storage.forEach(function(i,idx,n){
    //       sto.push(
    //       <option className="name" value={i + " GB"} >
    //       {i} GB
    //       </option>
    //       )
    //
    //     })
    //     this.age.forEach(function(i,idx,n){
    //       ag.push(
    //       <option className="name" value={i.count}>
    //       {i.name}
    //       </option>
    //       )
    //
    //     })
    //
    //     this.categoriesData = cc
    //     this.colorData = col
    //     this.storageData = sto
    //     this.agenames = ag
    //     console.log("categories received are",this.categoriesData);
    // }


  }
  constructor(props){
  super(props)
  this.state = {
    result: '',
    render: false,
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
handleFileInput = (e) => {
  console.log("filename ::", e.target.files[0]);
  this.file = e.target.files[0];
  console.log(this.file);
  var picdata = new FormData();
  picdata.append('userFile', 'e.target.files[0]');
  picdata.has('userFile'); // Returns true
  console.log(picdata.has('userFile'));

}
handleChange = event => {

  this.setState({[event.target.name]: event.target.value});
  console.log(event.target.value);
  console.log(event.target.name);

}

handleChangebrands = (e) => {

  this.setState({[e.target.name]: e.target.value});
  console.log(e.target.value);
  console.log(e.target.name);
  console.log("idd ...??",e.target);
  this.setState({brand_id: e.target.value});
  EventBus.publish("getMobileSpecs",  {brand_id: e.target.value})
}



ModelsReceived()
{
  // console.log("i just received brand")
  // if (localStorage.getItem("Models") != null)
  // {
  //   this.testmodels()
  //
  // }

}
testmodels(){
  //
  // EventBus.publish("showLoading")
  // var models;
  // console.log("models", JSON.parse(localStorage.getItem("Models")));
  //   var mod = []
  //
  //   models = JSON.parse(localStorage.getItem("Models"))
  //
  //   models.forEach(function(i,idx,n){
  //     mod.push(
  //     <option className="name" value={i._id}>
  //     {i.DeviceName}
  //     </option>
  //     )
  //   })
  //
  //   this.modelsData = mod
  //   EventBus.publish("stopLoading")
  //   this.gettitle();
}
gettitle = () =>{
//   var models = JSON.parse(localStorage.getItem("Models"))
//   console.log("models",models);
//   if(models != undefined){
//   var name = models[0]['Brand']['brandName'];
//   console.log("models",name);
//   this.adtitle = name;
//   EventBus.publish("showLoading")
//   if(this.adtitle != ''){
//
//     var celltitle =
//     <div className="full">
//     <label className={'Formtitle'}>
//     Ad Title
//     </label>
//     <p >{this.adtitle} </p>
//     </div>
//
//     this.title = celltitle
//     console.log("this.adtitle",this.adtitle);
//
//   }
//   EventBus.publish("stopLoading")
//
// }
// this.setState((state, props) => {
// return {counter: state.counter + props.step};
// })
}



handleButton = (event) => {
  console.log("Category", this.state.category);
  console.log("brand id",this.state.brand_id);
  console.log("device id",this.state.model);
  console.log("IMEI",this.state.imei);
  console.log("title",this.state.title);
  console.log("price",this.state.price);
  console.log("desxription",this.state.description);
  console.log("color",this.state.color);
  console.log("storage",this.state.storage );
  console.log("condition",this.state.condition);
  console.log("age",this.state.age_selected);
  console.log("filess",this.file);
  console.log("phonedead",phoneswitch);
  console.log("access",physchecks);
  console.log("physc",accesschecks);


  if(this.state.category != null && this.state.brand_id != null && this.state.model != null && this.state.imei != null && this.adtitle != null &&
  this.state.price != null && this.state.description != null && this.state.color != null && this.state.storage != null && this.state.condition != null &&
  this.state.age_selected != null && this.state.category != undefined && this.state.brand_id != undefined && this.state.model != undefined && this.state.imei != undefined && this.adtitle != undefined &&
  this.state.price != undefined && this.state.description != undefined && this.state.color != undefined && this.state.storage != undefined && this.state.condition != undefined &&
  this.state.age_selected != undefined) {

  var request = require("request");
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/placeAdd'

  var options = { method: 'POST',
  url: urlPath,
  headers:
  { 'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('JWT'),},
  body: {type:this.state.category,
        brandName:this.state.brand_id,
        deviceDetails: this.state.model,
        imei: this.state.imei,
        title: this.adtitle,
        price: this.state.price,
        description: this.state.description,
        color: this.state.color,
        storage: this.state.storage,
        condition: this.state.condition,
        age: this.state.age_selected,
        phoneDead:phoneswitch,
        physicalIssues:physchecks,
        accessories:accesschecks
},
  json: true };

  console.log("Call", options);

  request(options,  (error, response, body)=> {
    if (error) throw new Error(error);
    if(body){
      console.log("displaying next accordion")
      // EventBus.publish("showLoading")
      this.displaylocaccord = this.locationaccordion
    }
    if (body.result)
    {
      localStorage.setItem('AdPosted', JSON.stringify(body.result));
      console.log("result Received", body.result);
      this.newad_id = body.result._id
      console.log("file sending", this.newad_id);

      console.log("file sending", this.file);
      if(this.file != undefined && this.file != '' && this.file != null){
          console.log("sending to fileupload")
          this.fileupload()
      }else{
        console.log("file was missing")
      }
    }  else{
      console.log("API Result NOT Found");
    }
  });
}else{
  alert("Fields Missing!");
  console.log("something is undefined")
}
}

uploadFile=() =>
  {
    console.log("Uploading File...");

    var fs = require("fs");
    var request = require("request");
    console.log(this.file);
    const data = new FormData();
    data.append('userFile', this.file);
    console.log(data);
    // data.append('filename', "somethign123");


          const method = "POST";
          const body = new FormData('userFile', this.file);
          console.log("filename ::", body);
          fetch(urlObj.protocol + '//' + urlObj.hostname+ this.port + '/uploadImageWeb/' + this.newad_id, { method, body })
            .then(res => res.json())
            .then(body => alert(JSON.stringify(body, null, "\t")));



    // var options = {
    //             method: 'POST',
    //             headers: {'content-Type': 'multipart/form-data'},
    //             url: urlObj.protocol + '//' + urlObj.hostname+ this.port + "/uploadImageWeb/" + this.newad_id,
    //             formData:data,
    //     };
    // console.log("Options", options);
    //
    //   request(options, function (error, response, body) {
    //     // if (error) throw new Error(error);
    //     console.log(body);
    //   });
  }

fileupload(){
  console.log("uploading picture", this.newad_id);
  console.log("uploading picture", this.file);

  var request = require("request");
  var fill = this.file;
  var id = this.newad_id;
  var token = localStorage.getItem('JWT');
  const filetou = new FormData(fill);
  filetou.append('userFile',filetou);
  const headers1 = new FormData(token);
  headers1.append('Authorization',token );
  headers1.append('content-Type', 'multipart/form-data' );

  console.log(filetou);
  var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/uploadImageWeb/' + this.newad_id
  var options = { method: 'POST',
  url: urlPath,
  formData: this.picdata,
  json: true};
  console.log("Call", options);
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log("Ad With Picture", body.result);
    if (body.result)
    {
      console.log("Picture Posted");

    }else{
      console.log("API Result NOT Found");
    }
  });
}
send() {
    const method = "POST";
    const body = new FormData(this.form);
    console.log("filename ::", body);
    fetch("http://uploading-api-dev.herokuapp.com/upload", { method, body })
      .then(res => res.json())
      .then(body => alert(JSON.stringify(body, null, "\t")));
  }

state = {
    disabled: false,
  };

  toggle = () => {
    this.setState((state) => ({
      disabled: !state.disabled,
    }));
  }

  componentDidMount() {
    this.data_for_priscription();

    this.add_medicines = this.details_form


  }
componentDidUpdate(){

  if(this.state.geoDestination != '' && this.state.geoDestination != null &&this.state.geoDestination != undefined){
    searcharea = this.state.geoDestination;
    console.log("locations", searcharea);
  }

}
  postbylocation = () =>{
    var id = this.newad_id
    console.log("advert id", id)
    console.log("locations", searcharea);
    lat =searcharea.location.lat
    lng =searcharea.location.lng
    console.log("locations", lat);
    console.log("locations", lng);
    var locs = {lat: lat, lng:lng};
    // localStorage.setItem('addlocations', locs);
    // console.log("locations", localStorage.getItem('addlocations'));
    // console.log("locations", locs);

    if(lat != undefined && lat != '' && lat != null &&
        lng != undefined && lng != undefined && lng != undefined &&
        id != undefined && id != undefined && id != undefined) {

    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/updateAddLocation'

    var options = { method: 'POST',
    url: urlPath,
    headers:
    { 'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('JWT'),},
    body: {advert_id:id,
          lat:lat,
          lng: lng
  },
    json: true };

    console.log("Call", options);

    request(options,  (error, response, body)=> {
      if (error) throw new Error(error);
      if(body){
        console.log("verifications")
        // EventBus.publish("showLoading")
        this.displayverifyaccord = this.verifyaccordion

      }
      if (body.result)
      {
        this.forverification = body.result
        console.log("result Received", body.result);
        // this.verify_your_content();

      }  else{
        console.log("API Result NOT Found");
      }
    });
  }else{
    console.log("something is undefined")
  }

  }


  verifyAdd = () =>{
    console.log("advert id", this.newad_id)

    if(this.newad_id != undefined && this.newad_id != undefined && this.newad_id != undefined ) {

    var request = require("request");
    var urlPath =  urlObj.protocol + '//' + urlObj.hostname+ this.port + '/api/verifyTrue'

    var options = { method: 'POST',
    url: urlPath,
    headers:
    { 'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('JWT'),},
    body: {advert_id:this.newad_id
  },
    json: true };

    console.log("Call", options);

    request(options,  (error, response, body)=> {
      if (error) throw new Error(error);
      if (body.result)
      {
        console.log("result Received", body.result);
      }  else{
        console.log("API Result NOT Found");
      }
    });
  }else{
    console.log("something is undefined")
  }

  }

  verify_your_content (){
    // EventBus.publish("showLoading")
    var data = this.forverification;
    console.log("in verify_your_content ",data);

    var vs = [];
    data.forEach((i,idx,n) =>{
      vs.push(
        <div>
        <div className="leftSide">

        <div className="userKeys users_details">Title </div>
        <div className="userValue users_details">{i.title}</div>

        <div className="userKeys users_details">Category </div>
        <div className="userValue users_details">{i.type}</div>

        <div className="userKeys users_details">Color </div>
        <div className="userValue users_details">{i.color}</div>

        <div className="userKeys users_details">Storage </div>
        <div className="userValue users_details">{i.storage}</div>

        <div className="userKeys users_details">IMEI </div>
        <div className="userValue users_details">{i.imei}</div>

        <div className="userKeys users_details">Price </div>
        <div className="userValue users_details">{i.price}</div>

        <div className="userKeys users_details">Description </div>
        <div className="userValue users_details">{i.description}</div>
        </div>
        <div className="rightSide">

        <div className="userValue users_details">{i.pictures[0]}</div>

        </div>
        </div>
      )
    })
    this.verify_display = vs
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
    console.log("display created",this.verify_display)

  }

  addlocation(){
    console.log("location accordion expanded")
  }
  submitdetails =()=>{
    EventBus.publish("showLoading")
    // ref_no
    // date
    // age
    // name
    // general_history
    // chief_complaint
    // description
    // advice
    // treatment
    // mobile_no

  //   name
  // age
  // mobile
  // generalHistory
  // diagnosis
  // treatment


      this.patient_data = {ref_no:this.state.ref_no, date:this.state.date, name:this.state.name, age:this.state.age, mobile:this.state.mobile_no,
      generalHistory:this.state.general_history, diagnosis:this.state.diagnosis, chief_complaint:this.state.chief_complaint,
      treatment:this.state.treatment, advice:this.state.advice}

      console.log("patient data entered is", this.patient_data);
      this.add_medicines = this.medicine_view
      console.log(this.add_medicines);
      EventBus.publish("stopLoading")
  }


  finish_med =()=>{
    EventBus.publish("showLoading")
    this.add_medicines1 = <div></div>
    this.priscription_details = ''
      console.log(this.json_add)
      console.log(this.patient_data);
      var vs = []
      var pt_data = this.patient_data

      // var print_view =
      this.json_add.forEach((x,idy,z) =>{
        // console.log(i.form);
        vs.push(
          <span>
          <form className={'AccordionForm'}>
          <div className={'print_form'}>
          <div className={'TwoColumns'}>

          <div className="clinic_title">
          MUDASIR'S &nbsp;&nbsp; DENTALSURGERY
          </div>

          </div>

          <div className={'TwoColumns'}>
          <div className={'leftSide_float'}>
          <div className={'sub_titles_left'}>
          Complete Sterilization
          </div>

          </div>
          <div className={'rightSide_float'}>
          <div className={'sub_titles_right'}>
          Latest Technology
          </div>
          </div>

          </div>

          <div className={'TwoColumns'}>

          <div className="leftSide">
          <label className={'Formtitle'}>
          Reference No: &nbsp;
          </label>
          <span className={'Formtitle_detail'}> </span>

          <br />
          <label className={'Formtitle'} style={{marginLeft:"-48%"}}>
          Mobile No: &nbsp;
          </label>
          <span className={'Formtitle_detail'}> </span>

          </div>


          <div className="rightSide" style={{marginLeft:"40%"}}>

          <label className={'Formtitle'}>
          Date: &nbsp;
          </label>
          <span className={'Formtitle_detail'}></span>

          <br />
          <label className={'Formtitle'} style={{marginLeft:"-20%"}}>
          Age: &nbsp;
          </label>
          <span className={'Formtitle_detail'}> </span>


          </div>

          </div>
          <div className={'TwoColumns'}>
          <div className="leftter">

          <span className={'Formtitle'}>
          Name:
          </span>
          </div>

          <div className="righter">
          <span className={'Formtitle_detail'}> </span>
          </div>
          </div>

          <div className="TwoColumns">
          <div className="leftter">

          <span className={'Formtitle'}>
          General History: &nbsp;
          </span>
          </div>
          <div className="righter">
          <span className={'Formtitle_detail'}></span>

          </div>
          </div>

          <div className="TwoColumns">
          <div className="leftter">

          <span className={'Formtitle'}>
          Chief Complaint: &nbsp;
          </span>
          </div>
          <div className="righter">

          <span className={'Formtitle_detail'}> </span>
          </div>
          </div>


          <div className="TwoColumns">
          <div className="leftter">

          <span className={'Formtitle'}>
          Diagnosis: &nbsp;
          </span>
          </div>
          <div className="righter">

          <span className={'Formtitle_detail'}> </span>
          </div>
          </div>


          <div className="TwoColumns">
          <div className="leftter">

          <span className={'Formtitle'}>
          Advice: &nbsp;
          </span>
          </div>
          <div className="righter">

          <span className={'Formtitle_detail'}> </span>
          </div>
          </div>


          <div className="TwoColumns">
          <div className="leftter">

          <span className={'Formtitle'}>
          Treatment: &nbsp;
          </span>
          </div>
          <div className="righter">

          <span className={'Formtitle_detail'}> </span>
          </div>
          </div>

          <div className="TwoColumns">
          <div className="full">

          <div className={'tempColumn'}>

          <div className="full_view">
          <div className={'med_form'}>
           {x.form} &nbsp; &nbsp;
          </div>
          <div className={'med_name'}>
           {x.name} &nbsp; &nbsp;
          </div>
          <div className={'med_dosage'}>
           {x.dosage} &nbsp; &nbsp;
          </div>

          </div>
          </div>

          </div>
          </div>

          </div>
          </form>
          </span>
          )
      })
      // <div className={'tempColumn'}>
      //
      // <div className="full_view">
      // <div className={'med_form'}>
      //  {i.form} &nbsp; &nbsp;
      // </div>
      // <div className={'med_name'}>
      //  {i.name} &nbsp; &nbsp;
      // </div>
      // <div className={'med_dosage'}>
      //  {i.dosage} &nbsp; &nbsp;
      // </div>
      //
      // </div>
      // </div>

      this.add_medicines = vs
      EventBus.publish("stopLoading")
      // this.add_medicines = this.print_view
      this.setState((state, props) => {
      return {counter: state.counter + props.step};
      })

      console.log(this.add_medicines);
  }



  addmore = () =>{
    EventBus.publish("showLoading")

    if(this.state.medicine_form != '' && this.state.medicine_form != null && this.state.medicine_form != undefined &&
        this.state.medicine_name != '' && this.state.medicine_name != null && this.state.medicine_name != undefined &&
        this.state.medicine_dosage != '' && this.state.medicine_dosage != null && this.state.medicine_dosage != undefined){
    console.log(this.state.medicine_form);
    console.log(this.state.medicine_name);
    console.log(this.state.medicine_dosage);

      this.json_add.push({"form":this.state.medicine_form, "dosage": this.state.medicine_dosage, "name":this.state.medicine_name.toUpperCase()})
      document.getElementById("create-course-form").reset();
      this.state.medicine_form = ''
      this.state.medicine_dosage = ''
      this.state.medicine_name = ''

    console.log(this.json_add);
    console.log(this.add_medicines);
    this.format_medicines()
  }else{
    console.log("something is empty");
    EventBus.publish("stopLoading")
  }
  }
  format_medicines = () =>{
    var vs = []
    this.add_medicines1 = ''
    this.json_add.forEach((i,idx,n) =>{
      console.log(i.form);
      vs.push(
        <div className={'tempColumn'}>

        <div className="full_view">
        <div className={'med_form'}>
         {i.form} &nbsp; &nbsp;
        </div>
        <div className={'med_name'}>
         {i.name} &nbsp; &nbsp;
        </div>
        <div className={'med_dosage'}>
         {i.dosage} &nbsp; &nbsp;
        </div>

        </div>
        </div>
      )
    })

    this.add_medicines1 = vs
    EventBus.publish("stopLoading")

    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
  }



  medicine_view =
  <span>
  <div className={'TwoColumns'}>

  <div className="full">
  <label className={'Formtitle'} style={{marginRight: "100%"}}>
  Priscription: &nbsp;
  </label>

  <div>
  <form id="create-course-form">
  <select name="medicine_form" id="form_name" onChange={this.handleChange} className={'inputsdropdown'}>
  <option>
  </option>
  <option>
  Tablet
  </option>
  <option>
  Capsule
  </option>
  <option>
  Drops
  </option>
  <option>
  Inhalers
  </option>
  <option>
  Syrup
  </option>
  <option>
  Injections
  </option>
  <option>
  Implants
  </option>
  <option>
  Patches
  </option>
  <option>
  Ointment
  </option>
  <option>
  Cream
  </option>
  <option>
  Other
  </option>

   </select>

   <textarea type="text" rows="1" cols="30" name="medicine_name" onChange={this.handleChange} placeholder="Medicine Name" className={'medicine_lines'}/>
   <textarea type="text" rows="1" cols="30" name="medicine_dosage" onChange={this.handleChange} placeholder="Medicine Dosage" className={'medicine_lines2'}/>
    </form>
   </div>
  </div>

  </div>
  <button className={"addmoreButton"} onClick={this.addmore}>
  Add
  </button>
  <button className={"finishButton"} onClick={this.finish_med}>
  Finish
  </button>
        </span>


    details_form =
    <span>
    <form className={'AccordionForm'}>


    <div className={'TwoColumns'}>

    <div className="leftSide">
    <label className={'Formtitle'}>
    Reference No: &nbsp;
    </label>
    <textarea type="text" rows="1" cols="10" name="ref_no" onChange={this.handleChange} className={'ref_date'}/>

    <br />
    <label className={'Formtitle'} style={{marginLeft:"-48%"}}>
    Mobile No: &nbsp;
    </label>
    <textarea type="text" rows="1" cols="10" name="mobile_no" onChange={this.handleChange} className={'ref_date'}/>

    </div>


    <div className="rightSide" style={{marginLeft:"40%"}}>

    <label className={'Formtitle'}>
    Date: &nbsp;
    </label>
    <textarea type="text" rows="1" cols="10" name="date" onChange={this.handleChange} className={'ref_date'}/>

    <br />
    <label className={'Formtitle'} style={{marginLeft:"-20%"}}>
    Age: &nbsp;
    </label>
    <textarea type="text" rows="1" cols="10" name="age" onChange={this.handleChange} className={'ref_date'}/>



    </div>

    </div>
    <div className={'full'}>

    <label className={'Formtitle'}>
    Name:
    </label>
    <textarea type="text" rows="1" name="name" onChange={this.handleChange} className={'full_lines'}/>
    </div>

    <div className={'TwoColumns'}>

    <div className="full">
    <label className={'Formtitle'}>
    General History: &nbsp;
    </label>
    <textarea type="text" rows="1" cols="50" name="general_history" onChange={this.handleChange} className={'full_lines'}/>
    </div>

    </div>
    <div className={'TwoColumns'}>

    <div className="full">
    <label className={'Formtitle'}>
    Chief Complaint: &nbsp;
    </label>
    <textarea type="text" rows="1" cols="50" name="chief_complaint" onChange={this.handleChange} className={'full_lines'}/>
    </div>

    </div>
    <div className={'TwoColumns'}>

    <div className="full">
    <label className={'Formtitle'}>
    Diagnosis: &nbsp;
    </label>
    <textarea type="text" rows="1" cols="50" name="diagnosis" onChange={this.handleChange} className={'full_lines'}/>
    </div>

    </div>
    <div className={'TwoColumns'}>

    <div className="full">
    <label className={'Formtitle'}>
    Advice: &nbsp;
    </label>
    <textarea type="text" rows="2" cols="50" name="advice" onChange={this.handleChange} className={'full_lines'}/>
    </div>

    </div>

    <div className={'TwoColumns'}>

    <div className="full">
    <label className={'Formtitle'}>
    Treatment: &nbsp;
    </label>
    <textarea type="text" rows="2" cols="50" name="treatment" onChange={this.handleChange} className={'full_lines'}/>
    </div>

    </div>


    </form>

    <button className={"sugmitButton"} onClick={this.submitdetails}>
    Submit Details
    </button>
    </span>

    render(){

      return (
      <div className="PostPage">
      <HomeHeaderBar />
      <div className={'PostPageBody'}>

      <div className={'headerbar'}>
      <Link to={"/"}>
        <span className="SemiBold backBtn">Back to Home</span>
      </Link>

      <div className="SemiBold submit">Patients Details</div>

      </div>
      <div className={'PostAdForm'}>

      {this.add_medicines}
      {this.add_medicines1}

      </div>




      </div>
    </div>
    )}
}


export default PostAd;
