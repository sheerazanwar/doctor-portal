import React, { Component } from 'react';
import HomeHeaderBar from '../HomeHeaderBar/HomeHeaderBar'
import EventBus from 'eventing-bus';
import { Image,Glyphicon,InputGroup } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Accordion, AccordionItem } from 'react-sanfona';
import FileInput  from 'react-file-input';
import Checkbox from 'rc-checkbox';
import { createGeoInput, DefaultGeoInput } from 'react-geoinput';
import PropTypes from 'prop-types';

var url = require('url');
import './PostAd.css';

const manuCallback = function(object) {}
const SimpleInput = createGeoInput(DefaultGeoInput);
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


const BarebonesGeoInput = ({
  addressInput,
  loadingGeoDestination,
  geoDestinationInput,
  onPredictionClick,
  predictions,
}) => (
  <div>
    <input className={"input"} {...addressInput} />

    {loadingGeoDestination && <div style={{ marginTop: 10 }}>Loading destination ...</div>}

    <hr />

    <div>
      <div>
        {!!predictions && !!predictions.length ? predictions.map((prediction, index) => (
          <div className={"locationsdrop"} key={index} >
          <span className={"locationsdropdown"} onClick={() => onPredictionClick(index)}>
            {JSON.stringify(prediction.description)}
            </span>
          </div>
        )) : ''}
      </div>
    </div>

  </div>
);

BarebonesGeoInput.propTypes = {
  addressInput: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  loadingGeoDestination: PropTypes.bool.isRequired,
  geoDestinationInput: PropTypes.shape({
    value: PropTypes.object,
  }).isRequired,

  onPredictionClick: PropTypes.func.isRequired,
  // onChange: () => {this.searcharea = this.state.geoDestination },
  predictions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.node,
    onClick: PropTypes.func,
  })).isRequired,
};

const DemoInput = createGeoInput(BarebonesGeoInput);


class PostAd extends Component {

  state = {
      open: false,
      address: '',
      geoDestination: undefined,
    }
    onAddressChange = value => this.setState({ address: value })
    onGeoDestinationChange = value => this.setState({ geoDestination: value })


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

  getCond_Acc_phy()
  {
    EventBus.publish("getAccessories");
    EventBus.publish("getPhysical");
    EventBus.publish("getConditions");
    console.log("conditions in postad.js")
    var conditions;
    var accessories;
    var physical;

      console.log("conditions in postad.js ((IF))")
      conditions = JSON.parse(localStorage.getItem("Conditions"))
      accessories = JSON.parse(localStorage.getItem("Accessories"))
      physical = JSON.parse(localStorage.getItem("PhysicalConditions"))
      console.log("conditions", conditions);
      console.log("accessories", accessories);
      console.log("physical", JSON.parse(localStorage.getItem("PhysicalConditions")));

        var con = []
        var acc = []
        var phy = []

        conditions.forEach(function(i,idx,n){
          con.push(
          <option className="name" value={i._id}>
          {i.title}
          </option>
          )
        })
        accessories.forEach(function(i,idx,n){
          acc.push(
            <p><label >
            <Checkbox name="my-checkbox" onChange={onChangeaccess} value={i._id} />
            <span className="name"> {i.title}</span>
            </label></p>
          )
        })
        physical.forEach(function(i,idx,n){
          phy.push(
            <p><label >
            <Checkbox name="my-checkbox" onChange={onChangePhysical} value={i._id} />
            <span className="name"> {i.title}</span>
            </label></p>
          )
        })
        this.physicalData = phy
        this.accessoriesData = acc
        this.conditionsData = con
  }

  EnumsReceived()
  {

    var enums;

    if (localStorage.getItem("enums") != null)
    {

      enums = JSON.parse(localStorage.getItem("enums"))

      console.log("enums", JSON.parse(localStorage.getItem("enums")));

        // var category = this.enums.category;
        // console.log("Category Details", category);
        var category = enums.category
        console.log("categories" , category)
        var color = enums.color
        console.log("colors" , color)
        var storage = enums.storage
        console.log("storage" , storage)
        var cc = []
        var col = []
        var sto = []
        var ag = []

        category.forEach(function(i,idx,n){
          cc.push(
          <option className="name" value={i.name} >
          <img src="i.image" class="images"/>
          {i.name}
          </option>
          )

        })
        color.forEach(function(i,idx,n){
          col.push(
          <option className="name" value={i}>
          {i}
          </option>
          )

        })
        storage.forEach(function(i,idx,n){
          sto.push(
          <option className="name" value={i + " GB"} >
          {i} GB
          </option>
          )

        })
        this.age.forEach(function(i,idx,n){
          ag.push(
          <option className="name" value={i.count}>
          {i.name}
          </option>
          )

        })

        this.categoriesData = cc
        this.colorData = col
        this.storageData = sto
        this.agenames = ag
        console.log("categories received are",this.categoriesData);
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
  this.getCond_Acc_phy();

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
handleChange = (event) => {

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
  console.log("i just received brand")
  if (localStorage.getItem("Models") != null)
  {
    this.testmodels()

  }

}
testmodels(){

  EventBus.publish("showLoading")
  var models;
  console.log("models", JSON.parse(localStorage.getItem("Models")));
    var mod = []

    models = JSON.parse(localStorage.getItem("Models"))

    models.forEach(function(i,idx,n){
      mod.push(
      <option className="name" value={i._id}>
      {i.DeviceName}
      </option>
      )
    })

    this.modelsData = mod
    EventBus.publish("stopLoading")
    this.gettitle();
}
gettitle = () =>{
  var models = JSON.parse(localStorage.getItem("Models"))
  console.log("models",models);
  if(models != undefined){
  var name = models[0]['Brand']['brandName'];
  console.log("models",name);
  this.adtitle = name;
  EventBus.publish("showLoading")
  if(this.adtitle != ''){

    var celltitle =
    <div className="full">
    <label className={'Formtitle'}>
    Ad Title
    </label>
    <p >{this.adtitle} </p>
    </div>

    this.title = celltitle
    console.log("this.adtitle",this.adtitle);

  }
  EventBus.publish("stopLoading")

}
this.setState((state, props) => {
return {counter: state.counter + props.step};
})
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
      EventBus.publish("showLoading")
      this.displaylocaccord = this.locationaccordion
      EventBus.publish("stopLoading")
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
    this.brandsReceived();
    this.EnumsReceived();
    console.log("your currency is",localStorage.getItem('currency'))
    this.mycurrency = "Your Currency is " + '' + localStorage.getItem('currency')
    EventBus.on("brandsReceived", this.brandsReceived.bind(this));
    EventBus.on("ModelsReceived", this.ModelsReceived.bind(this));

    // EventBus.publish("ModelsReceived");

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
        EventBus.publish("showLoading")
        this.displayverifyaccord = this.verifyaccordion
        EventBus.publish("stopLoading")

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
    EventBus.publish("showLoading")
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
    EventBus.publish("stopLoading")

  }

  addlocation(){
    console.log("location accordion expanded")
  }



  locationaccordion = <div>
  <Accordion className={'MainAccordion'} >

  <AccordionItem className={'PostAdSteps'} title={<div className={'fontSemiBold titleAccordian'} onExpand={this.addlocation}>Insert Location</div>}>
  <form className={'AccordionForm'}>
  <div className="leftSide">
  <label className={"labels"}>
  Your Address
  </label> <br />
  <DemoInput style={{borderRadius:"5px 5px 5px 5px", width:"50%"}}
  addressInput={{
  onChange: this.onAddressChange,
  value: this.state.address,
  }}
  geoDestinationInput={{
  onChange: this.onGeoDestinationChange,
  value: this.state.geoDestination,
  }}
  />
  <p className={'hints'}>Depends on Package</p>

  </div>


  <div className="rightSide">

  </div>

  </form>
  </AccordionItem>

  </Accordion>
  <button className={"postAdButton"} onClick={this.postbylocation}>
  Update Location
  </button>
  </div>

  verifyaccordion =  <span>
        <Accordion className={'MainAccordion'} >

        <AccordionItem className={'PostAdSteps'} title={<div className={'fontSemiBold titleAccordian'} onExpand={this.addlocation}>Verify Ad</div>}>
        <form className={'AccordionForm'}>
        <div className="leftSide">
        {this.verify_display}
        </div>
        </form>
        </AccordionItem>

        </Accordion>
        <button className={"postAdButton"} onClick={this.verifyAdd}>
        Verify Ad
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
        <span className="SemiBold submit">SUBMIT AN AD</span>


      </div>
      <div className={'PostAdForm'}>
      <Accordion className={'MainAccordion'} openNextAccordionItem={true}>

      <AccordionItem className={'PostAdSteps'} title={<div className={'fontSemiBold titleAccordian'}>Necessary Requirements</div>} expanded={true} >
      <form className={'AccordionForm'}>

      <div className={'TwoColumns'}>

      <div className="leftSide">
      <label className={'Formtitle'}>
      Category
      </label>
      <p><select name="category" onClick={this.handleChange} className={'inputsdropdown'}>
      <option></option>
      {this.categoriesData}
       </select></p>
       <p className={'hints'}>Mobile Phones Tablets e.t.c.</p>

      </div>

      <div className="rightSide">

      <label className={'Formtitle'}>
      Brands
      </label>
      <p><select name="brand_id" onChange={this.handleChangebrands} className={'inputsdropdown'}>
      <option></option>
      {this.brandsData}
       </select></p>
       <p className={'hints'}>Apple, Samsung e.t.c</p>
      </div>

      </div>
      <div className={'TwoColumns'}>

      <div className="leftSide">
      <label className={'Formtitle'}>
      Device Model
      </label>
      <p><select name="model" onClick={this.handleChange} className={'inputsdropdown'} placeholder={this.mycurrency}>
      {this.modelsData}
       </select></p>
       <p className={'hints'}>Mobile Phone, Tablets e.t.c</p>

      </div>

      <div className="rightSide">

      <label className={'Formtitle'}>
      IMEI
      </label>
      <p><input type="number" min="14" max="20" name="imei" onChange={this.handleChange} className={'inputsdropdown'}/></p>
      <p className={'hints'}>Minimum 14 characters. (optional)</p>
      </div>

      </div>

      <div className={'TwoColumns'}>

      {this.title}

      </div>

      <div className={'TwoColumns'}>

      <div className="leftSide">

      <label className={'Formtitle'}>
      Price
      </label>
      <p><input type="number" min="1" name="price" onChange={this.handleChange} placeholder={this.mycurrency} className={'inputsdropdown'}/></p>
        <p className={'hints'}>You Can Change Your Currency In Account Settings</p>
      </div>

      </div>

      <div className={'TwoColumns'}>

      <div className="full">
      <label className={'Formtitle'}>
      Ad Description
      </label>
      <p><textarea type="text" rows="4" cols="50" name="description" onChange={this.handleChange} className={'textarea'}/></p>
        <p className={'hints'}>Max 3000 Characters</p>
      </div>

      </div>

      <div className={'TwoColumns'}>

      <div className="leftSide">
      <label className={'Formtitle'}>
      Color
      </label>
      <p><select name="color" onClick={this.handleChange} className={'inputsdropdown'}>
      <option></option>
      {this.colorData}
       </select></p>
      </div>

      <div className="rightSide">

      <label className={'Formtitle'}>
      Storage
      </label>
      <p><select name="storage" onClick={this.handleChange} className={'inputsdropdown'}>
      <option></option>
      {this.storageData}
       </select></p>
      </div>

      </div>

      <div className={'TwoColumns'}>

      <div className="leftSide">
      <label className={'Formtitle'}>
      Condition
      </label>
      <p><select name="condition" onClick={this.handleChange} className={'inputsdropdown'}>
      <option></option>
      {this.conditionsData}
       </select></p>
      </div>

      <div className="rightSide">

      <label className={'Formtitle'}>
      Age
      </label>
      <p><select name="age_selected" onClick={this.handleChange} className={'inputsdropdown'}>
      <option></option>
      {this.agenames}
       </select></p>
      </div>

      </div>

      <div className={'PictureColum'}>

      <div className={'picture_area'}>
      <label for="file">
      <input id="userFile" type="file" style={{display:"none"}} name="userFile" accept=".png,.gif,.jpeg,.jpg" onChange={(e) =>this.handleFileInput(e)} />
      <Image src="/img/camera.png" className={'fle'}/>
      </label>

      </div>

      <p className={'hints'}>Ads with Photos Sell Faster</p>

      </div>

      </form>

      <Image src="/img/arr-down.png" className={'arrow'} />

      </AccordionItem>

      <AccordionItem className={'PostAdSteps'} title={<div className={'fontSemiBold titleAccordian'}>Functional and Physical Condition</div>}>
      <form className={'AccordionForm'}>
      <div className="rightSide">
      <label className={'Formtitle'}>
      Functional or Physical Conditions
      </label>
      <label>
      Does The Mobie Switch On &nbsp;
      <Checkbox name="brands" onChange={phonedeadcheck} type="checkbox" />
      </label> <br />
      <div className={'lightitles'}> Please Tick/Untick Checkboxes </div>
      {this.physicalData}

      </div>
      </form>
      <Image src="/img/arr-down.png" className={'arrow'}/>
      </AccordionItem>

      <AccordionItem className={'PostAdSteps'} title={<div className={'fontSemiBold titleAccordian'}>Accessories (Optional)</div>}>
      <form className={'AccordionForm'}>
      <div className="rightSide">
      <label className={'Formtitle'}>
      Available Accessories
      </label>
      <div className={'lightitles'}> Please Tick/Untick Checkboxes </div>
      {this.accessoriesData}
      </div>
      </form>

      </AccordionItem>

      </Accordion>
      <button className={"postAdButton"} onClick={this.handleButton.bind(this)} >
      Post Ad
      </button>

      {this.displaylocaccord}
      {this.displayverifyaccord}


      </div>

      </div>
    </div>
    )}
}


export default PostAd;
