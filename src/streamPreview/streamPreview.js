import React from 'react';
import { Link } from 'react-router-dom';
import './streamPreviewStyles.css';

export default class StreamPreview extends React.Component {

  render() {

    const url = "/" + this.props.barTitle;

    return (
      <div className="container">
        <Link to={url} className="stream-preview-link">
          <img className="coverPhoto" src={this.props.photo} alt={this.props.barTitle} />
          <p className="coverTitle"> {this.props.barTitle} Live Stream </p>
        </Link>
      </div>
    );
  }
}