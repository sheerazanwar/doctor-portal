import React, { Component } from 'react';
import { Col, Glyphicon, InputGroup,Image, Button,Label,FormGroup,form,FormControl,ControlLabel  } from 'react-bootstrap';
import EventBus from 'eventing-bus';
import './HomePage.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Geocode from "react-geocode";
import { createGeoInput, DefaultGeoInput } from 'react-geoinput';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const manuCallback = function(object) {}
const SimpleInput = createGeoInput(DefaultGeoInput);
//
// Geocode.setApiKey("AIzaSyAmJXP-luQXB68lchXN2Wm9oe40MuxzHHI");
// Geocode.enableDebug();

// Geocode.fromLatLng("48.8583701", "2.2922926").then(
// response => {
// const address = response.results[0].formatted_address;
// console.log(address);
// },
// error => {
// console.error(error);
// }
// );

// Get latidude & longitude from address.
// Geocode.fromAddress("askari").then(
// response => {
//
//   console.log(response);
// const { lat, lng } = response.results[0].geometry.location;
// console.log(lat, lng);
// },
// error => {
// console.error(error);
// }
// );

var searcharea = []
var lat = []
var lng = []

const fieldText = {
  backgroundColor: '#ffffff',
  height: '35px',
  'borderColor': '#ffffff',
  outline: 'none',
  color: '#5f5f5f'
}



const fieldImg = {
  backgroundColor: '#ffffff',
  width: '35px',
  height: '35px',
  'borderColor': '#ffffff',
  display: 'block',
  'marginLeft': 'auto',
  'marginRight': 'auto',
  padding: '08px'
}


const reactionImg = {
  backgroundColor: '#ffffff',
  width: '35px',
  height: '35px',
  'borderColor': '#ffffff',
  display: 'block',
  'marginLeft': 'auto',
  'marginRight': 'auto',
  padding: '08px'
}

const TopPartLabel={

  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordWrap: 'break-word',
  fontWeight: '700',
  color: '#555555',
  textAlign: 'left',
  fontSize: '18px',
  height: '30px'

}

const TopSearchLabelText={

  paddingTop: '10px',
  width: '15%',
  color: '#555555',
  textAlign: 'left',
  fontSize: '18px',
  display:'float'
}

const TopSearchBox={
  paddingTop: '0px',
  width: '90%',
  color: '#555555',
  textAlign: 'left',
  fontSize: '15px',
  display:'float',
  height: '35px',
  borderColor: '#ffffff'
}

const TopSearchLabelDiv={
  margin: '0px 0px 0px 0px',
  height: '40px',
  display: 'flex'
}

var TopText = ""
var SearchLabelText = ""


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

// <span>
//     {geoDestinationInput.value ? JSON.stringify(geoDestinationInput.value.location.lat, null, 2): ''}
// </span>
class TopPart extends Component {

  searching_in = "Islamabad,Pakistan"


  state = {
      open: false,
      address: '',
      geoDestination: undefined,
    }
    onAddressChange = value => this.setState({ address: value })
    onGeoDestinationChange = value => this.setState({ geoDestination: value })

  manuCallback = function(object)
  {
  //  console.log("Changing to ", object);
    this.TopText = "Vom Hersteller "+object+" gibt es folgende Produkte"

    this.setState((state, props) => {

      // props.buttonTitle = this.buttonTitle
      return {counter: state.counter + props.step};
    });
  }
  onOpenModal = () => {
    console.log("open")
   this.setState({ open: true });
 };

  onCloseModal = () => {
   this.setState({ open: false });
 };
  callback = function(object)
  {
    //console.log("Changing to ", object);
    this.TopText = "In der Kategorie Bier haben wir 142 Produkte gefunden:"

    this.setState((state, props) => {

      // props.buttonTitle = this.buttonTitle
      return {counter: state.counter + props.step};
    });
  }
  constructor(props) {
      super(props)
      this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }
  componentDidMount() {
    this.TopText = "In der Kategorie Bier haben wir 142 Produkte gefunden:"
    this.SearchLabelText = "Suchen: "

    EventBus.on("Category", this.callback.bind(this));
    EventBus.on("ManuChanged", this.manuCallback.bind(this));

  }
  componentDidUpdate(){
    if(this.state.geoDestination != '' && this.state.geoDestination != null &&this.state.geoDestination != undefined){
      searcharea = this.state.geoDestination;
      // console.log("locations", searcharea);
    }else{

    }

  }



  handleSubmit(){
    console.log(localStorage.getItem('JWT'));
    if (localStorage.getItem('JWT') == null || localStorage.getItem('JWT') == undefined){
    }else{

    }
  }
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.value);
  }

  applyKeyword = (event) =>{
    console.log("in keyword");
    console.log(this.state.searchkeyword)
    localStorage.setItem('searchkeyword', this.state.searchkeyword);
    EventBus.publish("searchKeyword");
  }
  searchbylocation = (event) => {
    console.log("locations", searcharea);
    if(searcharea.location != '' && searcharea.location != undefined){
      var lat =searcharea.location.lat
      var lng =searcharea.location.lng
    }

    var city = searcharea.city
    var country = searcharea.country
    this.searching_in = city + ','+ country;
    var radii = this.state.radius
    console.log("locations", lat);
    console.log("locations", lng);
    console.log(radii);
    var locs = {lat: lat, lng:lng, distance:radii};
    localStorage.setItem('searchLocation', locs);
    console.log("locations", localStorage.getItem('searchLocation'));
    console.log("locations", locs);
    if(radii != undefined && radii != '' && radii != null && lat != undefined && lat != '' && lat != null){
      EventBus.publish("searchLocation", {lat: lat, lng:lng, distance:radii});
    }
    else{
      alert("Fields Missing!");
    }
    setTimeout(this.handleCloseModal(), 5000)
    radii =""
  }

  render() {
    const { open } = this.state;

    return (
      <div className={"TopPart"}>

      <FormGroup>
        <InputGroup style={{alignItems: 'center'}} >

          <div style={{borderRadius: '7px 7px 7px 7px', border:'1px solid black', display: 'flex', width: '60%', height: '40px', alignItems: 'center'}}>
            <FormControl className="fontRegular" placeholder="Search with Keyword " type="text" style={TopSearchBox} name="searchkeyword" onChange={this.handleChange}/>
            <InputGroup.Addon style={{alignItems: 'center', height: '20px', width: '10%'}} ><Glyphicon glyph="search" onClick={this.applyKeyword}/> </InputGroup.Addon>
          </div>

        </InputGroup>
      </FormGroup>
      <div className={"fontRegular searching"} >
      <span style={{color:"#5a555e"}}> Searching in </span> <span style={{textDecoration: "underline", color:"#5a555e"}}> {this.searching_in}</span> <span style={{color:"#156dbf", cursor:"pointer"}} onClick={this.handleOpenModal}>
      Change
      </span>
      <Modal style={{borderRadius:"20px"}} isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example" >
        <span className={"close"} onClick={this.handleCloseModal}>x</span>
        <label className={"labels"}>
        Location Filter
        </label> <br />
        <label className={"labels1"}>
        Enter City
        </label> <br />
        <DemoInput style={{borderRadius:"5px 5px 5px 5px", borderTop:"0px !important"}}
        addressInput={{
        onChange: this.onAddressChange,
        value: this.state.address,
        }}
        geoDestinationInput={{
        onChange: this.onGeoDestinationChange,
        value: this.state.geoDestination,
        }}
        />
        <div >
        <label className={"labels2"}>
        Search Radius
        </label> <br />
        <input type="number" min="1" max="200" name="radius" onChange={this.handleChange} className={"radiusinput"}/> <span className={"fontRegular"}> Miles </span>
        <div>
        <button className={"BlueButton"} style={{marginLeft:"29%", marginTop:"20%"}} onClick={this.searchbylocation}>
        Search Area
        </button></div>
        </div>

        </Modal>

      </div>
      <div>
      <Link to={"/postad"}>
      <button className={"BlueButton"} style={{float: "right", marginRight:"-2%"}}>
      Post an Ad
      </button>
      </Link>
      </div><br />


      </div>
    );
  }

}

export default TopPart;
