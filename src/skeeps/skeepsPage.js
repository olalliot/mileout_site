import React from 'react';
import HeaderBar from '../headerBar/headerBar';
import './skeepsPageStyles.css';
import TabBar from '../tabBar/tabBar';
import downtime from '../downtime.png';

export default class skeepsPage extends React.Component {

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
        <div className="iframe-container">
          <iframe
            title="skeepsStream"
            className="iframe-design"
            src="https://player.twitch.tv/?channel=mileout"
            frameborder="0"
            allowfullscreen="true"
            scrolling="no"
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

    return(
      <div>
        <HeaderBar page="Skeeps"/>
        {this.downtimeRender()}
        <TabBar show={isMobile} activeIndex={1} />
      </div>
    );
  }
}