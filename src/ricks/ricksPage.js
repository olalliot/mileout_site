import React from 'react';
import TabBar from '../tabBar/tabBar';
import HeaderBar from '../headerBar/headerBar';
import './ricksPageStyles.css';
import downtime from '../downtime.png';

export default class RicksPage extends React.Component {

  downtimeDecider() {
    let hours = new Date();
    hours = hours.getUTCHours();
  
    let minutes = new Date();
    minutes = minutes.getUTCMinutes();
  
    let day = new Date();
    day = day.getUTCDay();
    
    if ((day === 0 || day === 3 || day === 5 || day === 6)
      && (hours >= 1 && (hours < 6 || (hours === 6 && minutes <= 30)))) {
        return true;
      }
  
    return false;
  }

  downtimeRender() {
    if (this.downtimeDecider()) {
      return(
        <div className="ricks-iframe-container">
          <iframe 
            id="ipCamera"
            title="ricks"
            className="ricks-iframe"
            src="https://g1.ipcamlive.com/player/player.php?alias=alleycam" width="100%" height="100%"
            autoplay="1"
            frameborder="0"
            allowfullscreen
          >
          </iframe>
        </div>
      );
    } else {
      return (
        <div className="downtime-image-container" >
          <img src={downtime} alt="offline" className="downtime-image" />
        </div>
      );
    }
  }

  render() {

    const isMobile = window.innerWidth < window.innerHeight;

    return (
      <div>
        <HeaderBar page="Ricks"/>
        {this.downtimeRender()}
        <TabBar show={isMobile} activeIndex={2}/>
      </div>
    );
  }
}