import React, { Component } from 'react';
import {   Button, Image  } from 'react-bootstrap';
import { Accordion, AccordionItem } from 'react-sanfona';
import EventBus from 'eventing-bus';
import Checkbox from 'rc-checkbox';

import './FilterMenu.css'
import './HomePage.css'

var brandscheck = [];
var brandsfinalcheck = [];

function onChangebrand(e) {
  console.log('Checkbox checked:', (e.target.checked));
  console.log('Checkbox checked:', (e.target.value));
  if(e.target.value == -1){
    console.log(e.target.value)
  }
  console.log(brandscheck);
  if(e.target.checked == true){
    // checks = checks.concat(e.target.value);
    brandscheck.push(e.target.value);
    console.log('final checked:', brandscheck);
  } else if(e.target.checked == false){
    //checks.pull(e.target.value);
    console.log("in false")
    brandsfinalcheck = [];
    brandscheck.forEach(function(i,idx,x){
      console.log(i , e.target.value)
      if(i+"" == e.target.value+""){
        console.log("matched")
      }else{
        brandsfinalcheck.push(i);
      }
      if(idx == x.length-1){
        brandscheck = brandsfinalcheck;
        console.log("final check : ", brandsfinalcheck);
        console.log(brandscheck);
      }
    })
//    checks.splice(e.target.value );
    console.log('final checked:', brandscheck);
  }
  console.log('final checked:', brandscheck);

}

class FilterMenu extends Component{


  brandsData = []
  checkpic = {
          height: '10px',
          position: 'absolute',
          left:'13.2%',
          marginTop:'-1%'
        };


  handleChangeChk = function(){
    console.log("****");
  }

  applyFilters = (event) =>{
    console.log("in savefilters");
    console.log(this.price_from.value)
    console.log(this.price_to.value)
    console.log("in savefilters");

    console.log("Happened from", this.price_from.value);
    console.log("Happened to", this.price_to.value);
    console.log(brandscheck);
    var brandName = ''
    var price_start = '0'
    var price_end = '1500'
    if(this.price_from.value != undefined && this.price_from.value != ''){
      price_start = this.price_from.value
    }
    if(this.price_to.value != undefined && this.price_to.value != ''){
      price_end = this.price_to.value
    }
    brandscheck.forEach(function(i,idx,x){
      brandName = brandscheck +','
    })
    console.log(brandName)
    console.log(price_start)
    console.log(price_end)
    var type_selected = localStorage.getItem('type');

    EventBus.publish("searchFilters", {brandName: brandName, priceStart:price_start, priceEnd:price_end, type:type_selected});

    // console.log("event", event);
  }
  brandsReceived()
  {
    var brands;
    if (localStorage.getItem("brands") != null)
    {
      brands = JSON.parse(localStorage.getItem("brands"))
      console.log("brands", JSON.parse(localStorage.getItem("brands")));
        var bb = []
        brands.forEach(function(i,idx,n){
          bb.push(<label className="brandsOption">
          <Checkbox className="checkbox" onChange={onChangebrand} name={i.brandName} value={i.brandName} />
          <p className="name"> {i.brandName}</p>
          </label>)
        })
        this.brandsData = bb
    }
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
    })
  }

  componentDidMount() {
    EventBus.on("brandsReceived", this.brandsReceived.bind(this));
  }

  componentDidUpdate() {

  }


  catChanged(type){

    console.log("Type", type);
    var brr = localStorage.getItem("brands")
    if (brr.indexOf(type+",") != -1)
    {
      brr = brr.replace(type+",", "")
    }
    else{
      brr = brr+type+","
    }

    localStorage.setItem("brands", brr)

    console.log("Brands Selcetd", brr);
    EventBus.publish("getAds", true)
  }
  handleChange = (event) => {
    console.log(brandscheck);
    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.value);
    console.log(event.target.name);

  }


  typeClicked(type){
    console.log("Clicked");
    console.log("Type", type);
    if(type == "mobile"){
      console.log("Type", type);
      this.checkpic = {
              height: '10px',
              position: 'absolute',
              left:'13.2%',
              marginTop:'-1%'
            };
    }else if(type == "tablet"){
      console.log("Type", type);
      this.checkpic = {
              height: '10px',
              position: 'absolute',
              left:'17.7%',
              marginTop:'-1%'
            };
    }else if(type == "accessories"){
      console.log("Type", type);
      this.checkpic = {
              height: '10px',
              position: 'absolute',
              left:'22.2%',
              marginTop:'-1%'
            };
    }
    localStorage.setItem('type', type);

    EventBus.publish("getAds", true)

  }

  render() {
    return (
      <div className="FilterMenu">
      <div>
      <Image style={{height:"100px",marginBottom:"5%", marginTop:"8%", float:"left", marginLeft:"7%"}} src="/img/logo.png" />
      </div>

      <Accordion style={{width:"80%", marginTop:"50%"}} allowMultiple = {true}>

      <AccordionItem title={<h className="leftside fontSemiBold filterType">Device Type</h>} expanded={true}>
      <br /><br />
        <div className="leftside typeBtns">
          <Image name="phone" className={"typeButton"} src="/img/smartphone.png" onClick={() => this.typeClicked("mobile") }/>
          <Image name="check" src="/img/checked.png" style={this.checkpic}/>
          <Image name="tablet" className={"typeButton"} src="/img/ipad.png" onClick={() => this.typeClicked("tablet") } />
          <Image name="accessories" className={"typeButton"} src="/img/battery.png" onClick={() => this.typeClicked("accessories") } /><br />
      </div><br />

      </AccordionItem><br /><br />

      <AccordionItem title={<h className="leftside fontSemiBold filterType" > Brands</h>} expanded={true}>
        <form className="leftside fontRegular brandsForm">
          {this.brandsData}
        </form><br />
      </AccordionItem><br /><br />

      <AccordionItem title={<h className="leftside fontSemiBold filterType"> Price Range (USD)</h>} expanded={true}>
        <div className="leftside fontRegular">
        <input type="number" name="price_from" ref={node => (this.price_from = node)} placeholder="Starting" style={{width:"40%"}}/> <span style={{width:"20%"}}>&nbsp; To &nbsp; </span>
        <input type="number" name="price_to" ref={node => (this.price_to = node)} placeholder="Ending" style={{width:"40%"}}/>
        </div>
      </AccordionItem><br /><br />

      </Accordion>
      <button className="leftside fontSemiBold applyBtn" style={{color:"#ffffff", textAlign:"center"}} onClick={this.applyFilters.bind(this)}>  Apply Filters </button>
      <br /><br />


      </div>

    )
  }
}


export default FilterMenu;
