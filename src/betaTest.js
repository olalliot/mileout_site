import React from 'react';
import TabBar from './tabBar/tabBar';
import HeaderBar from './headerBar/headerBar';
import './betaTestStyles.css'

export default class betaTest extends React.Component {

  render() {
    const isMobile = window.innerWidth < window.innerHeight;

    return (
      <div>
        <HeaderBar />
        <div className={isMobile ? "beta-test-body-mobile" : "beta-test-body"}>
          <div className="announcement-container-beta">
            <p className="announcement-beta" > This sign-up will close on Wednesday 2/5 at 6pm </p>
          </div>
          <div className="explanation-beta-test">
            <p className="section-title-beta"> What is it ? </p>
            <p className="section-body-beta"> 
              To accurately estimate the wait times at Skeeps and Ricks, 
              we are developing a crowdsourced wait time predictor. All you have to do is check into the line when 
              you arrive, and check out when you get in. By collecting time spent in line, 
              we will be able to estimate the line length for everyone.
            </p>
            <p className="section-title-beta"> How can I get involved ?</p>
            <p className="section-body-beta"> 
              Simply submit your name and email below and we will contact you with 
              further details on Wednesday at 6pm 
            </p>
          </div>
        </div>
        <TabBar show={isMobile} />
      </div>
    );

  }

}