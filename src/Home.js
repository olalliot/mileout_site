import React from 'react';
import StreamPreview from './streamPreview/streamPreview';
import TabBar from './tabBar/tabBar';
import HeaderBar from './headerBar/headerBar';
import { Link } from 'react-router-dom';
import ricks from './streamPreview/ricks.jpg';
import skeeps from './streamPreview/Skeeps.jpg';
import instaLogo from './instaLogo.png';
import './fonts/fontStyles.css';
import './Home.css';

export default class Home extends React.Component {

  render() {
  
    const isMobile = window.innerWidth < window.innerHeight;
  
    return (
      <div>
        <HeaderBar page="Home" />
        <div className={isMobile ? "App-preview-container-mobile" : "App-preview-container"}>
          <StreamPreview photo={skeeps} barTitle="Skeeps" />
          <StreamPreview photo={ricks} barTitle="Ricks" />
        </div>
        <div className="bottom-page-link-container">
          <div className="bottom-page-links">
            <a href="https://www.instagram.com/mileout/">
              <img src={instaLogo} alt="instagram" className="social-media-logo"/>
            </a>
            <Link to="/about" className="about-page-link">
              <p className="about-page-text">
                About Us
              </p>
            </Link>
          </div>
        </div>
        <TabBar activeIndex={0} show={isMobile}/>
      </div>
    );
  }
}
