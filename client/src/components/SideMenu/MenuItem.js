import React, { Component } from 'react';
import { Image, Form, FormGroup, FormControl,Button ,InputGroup } from 'react-bootstrap';


import './SideMenu.css';

class MenuItem extends Component {


  render() {

    return(
      <div className="MenuItem">


        <Image className={"ItemImage"} src={this.props.image}/>
        <p className={"ItemName"} >{this.props.title}</p>
      </div>)

  }

}

export default MenuItem;
