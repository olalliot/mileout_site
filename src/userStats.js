import React from 'react';
import { connect } from 'react-redux';
import './userStatsStyles.css';

class UserStats extends React.Component {

  render() {
    const { isAuthenticated, visitedUser } = this.props;
    if (isAuthenticated) {
      return (
        <div>
          <p> {visitedUser.numResponses} </p>
        </div>
      );
    }
  }

}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    visitedUser: state.auth.visitedUser
  };
}

export default connect(mapStateToProps)(UserStats);