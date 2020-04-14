import React from 'react';
import './LoaderEffects.css';

//Inspiration from https://codepen.io/AllThingsSmitty/pen/zxGyXd

export default class Loader extends React.Component {
  render() {
    return (
      <div aria-busy="true" aria-label="Loading" role="progressbar" className="container-loader">
        <div className="swing">
          <div className="swing-l"></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="swing-r"></div>
        </div>
      </div>
    );
  }
}