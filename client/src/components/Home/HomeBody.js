import React, { Component } from 'react';
import TopPart from './TopPart'
import AdItem from './AdItem'
import EventBus from 'eventing-bus';



class HomeBody extends Component {


  componentDidMount() {

    EventBus.publish("showLoading")

    console.log("didMount", "HomeBody.js");

    EventBus.publish('getAds')
    EventBus.publish('getBrands')
    EventBus.publish('getEnums')


    EventBus.on("adResult", this.showAds.bind(this));
  }



  showAds = function()
  {
    console.log("Loading Ads...");
    var adsData = localStorage.getItem('adsResult');

    // console.log("adsData", adsData);
    var adsJsonData = JSON.parse(adsData);


    console.log("Ads", adsJsonData);
    var cc = []
    adsJsonData.forEach(function(i,idx,x){

      if (i.pictures.length > 0)
      {
        // i.pictures = i.pictures
      }
      else
      {
        i.pictures.push("http://support.yumpu.com/en/wp-content/themes/qaengine/img/default-thumbnail.jpg")
      }

      i.price = (parseFloat(i.price)).toFixed(2);

      cc.push(<AdItem key={idx} ad={i} />)
    })
    this.status = "Listing " + cc.length + " Ads"

    this.content = cc
    this.setState((state, props) => {
    return {counter: state.counter + props.step};
  })

  EventBus.publish("stopLoading")


  }

  content = []
  status = "Loading Ads..."

  render() {

    return(
      <div className="HomeBody">
        <TopPart />

        <div className={"fontSemiBold listingCount"}>
          { this.status }
        </div>
        <div className={"AdsContent"}>
          { this.content }
        </div>


      </div>)
    }

}

export default HomeBody;
