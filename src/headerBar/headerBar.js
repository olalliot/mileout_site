import React from 'react';
import './headerBarStyles.css';
import { Link } from 'react-router-dom';
import logo from './logo.png';

export default class HeaderBar extends React.Component {
  render() {
    const isMobile = window.innerWidth < window.innerHeight;

    if (isMobile) {
      return (
        <div className="header-container-mobile">
          <Link to='/' className="header-link-design-mobile">
            <img src={logo} className="header-logo-mobile" alt="logo"></img>
            <p className="header-title"> mile out </p>
          </Link>
        </div>
      );
    } else {
      return (
        <header className="header-style">
          <div className="header-container">
            <Link to='/' className="header-link-design">
              <img src={logo} className="header-logo" alt="logo"></img>
              <p className="header-title"> mile out </p>
            </Link>
          </div> 
          <div className="page-links" >
            <Link to='/' className={this.props.page === 'Home' ? "header-link-element-selected" : "header-link-element"}>
              <p className="header-text-style">
                Home
              </p>
            </Link>
            <Link to='/skeeps' className={this.props.page === 'Skeeps' ? "header-link-element-selected" : "header-link-element"}>
              <p className="header-text-style">
                Skeeps
              </p>
            </Link>
            <Link to='/ricks' className={this.props.page === 'Ricks' ? "header-link-element-selected" : "header-link-element"}>
              <p className="header-text-style">
                Ricks
              </p>
            </Link>
          </div>      
        </header>
      );
    }
  }
}
/* Add account to header bar
  <Link to='/account' className={this.props.page === 'Account' ? "header-link-element-selected" : "header-link-element"}>
    <p className="header-text-style">
      Account
    </p>
  </Link>
*/