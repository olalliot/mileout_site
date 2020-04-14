import React from 'react';
import HeaderBar from '../headerBar/headerBar';
import TabBar from '../tabBar/tabBar';
import './aboutPageStyles.css';

export default class aboutPage extends React.Component {

  render() {

    const isMobile = window.innerWidth < window.innerHeight;

    return (
      <div>
        <HeaderBar page="About"/>
        <div>
          <div className="about-title-container">
            <p className="about-title-text">
              Kick off the night right, check the line!
            </p>
          </div>
          <div className={isMobile ? "body-container-mobile" : "body-container"}>
            <p className="about-body-text">
              mile out is a service for students, by students.
              By live streaming the lines at the two most popular bars on campus,
              mile out helps you check the line before you go.
            </p>
            <p className="about-body-text">
              Follows us on Instagram <a href="https://www.instagram.com/mileout" className="about-page-instagram"> @mileout </a>, or reach out
              directly down below!
            </p>
          </div>
          <form className={isMobile ? "contact-form-mobile" : "contact-form"}>
            <input className={isMobile ? "input-contact-form-mobile" : "input-contact-form"} placeholder="Name" type="text" />
            <input className={isMobile ? "input-contact-form-mobile" : "input-contact-form"}  placeholder="Email" type="text" />
            <textarea className="comment-box-style" placeholder="Your message here..."></textarea>
            <input type="submit" className={isMobile ? "submit-button-mobile" : "submit-button"}/>
          </form>
        </div>
        <div className="padding-container" />
        <TabBar show={isMobile} />
      </div>
    );
    
  }

}
