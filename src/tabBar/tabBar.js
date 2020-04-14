import React from 'react'
import homeButton from './homeButton.png';
import homeButtonAlt from './homeButtonAlt.png';
import skeepsButton from './skeepsButton.png';
import skeepsButtonAlt from './skeepsButtonAlt.png';
import ricksButton from './ricksButton.png';
import ricksButtonAlt from './ricksButtonAlt.png';
import { Link } from 'react-router-dom';
import './tabBarStyles.css';


export default class TabBar extends React.Component {
  render() {
    if (this.props.show) {
      return (
        <div>
          <div className="padding-container" />
          <div className="tabBarContainer">
            <Link to='/'>
              <img className="barIcon" src={this.props.activeIndex === 0 ? homeButtonAlt : homeButton} alt="home" />
            </Link>
            <Link to='/skeeps'>
              <img className="barIcon" src={this.props.activeIndex === 1 ? skeepsButtonAlt : skeepsButton} alt="skeeps" />
            </Link>
            <Link to='/ricks'>
              <img className="barIcon" src={this.props.activeIndex === 2 ? ricksButtonAlt : ricksButton} alt="ricks" />
            </Link>
          </div>
        </div>
      );
    } else {
      return (null);
    }
  }
}