import React from 'react';
import { connect } from "react-redux";
import { fetchUser, sendNotification, setNotificationStatus } from './actions'; 
import TabBar from './tabBar/tabBar';
import Loader from './constants/Loader';
import HeaderBar from './headerBar/headerBar';
import UserStats from './userStats';
import './userPageStyles.css';

class UserPage extends React.Component {

  componentDidMount() {
    const { match: { params }, dispatch } = this.props;
    dispatch(fetchUser(params.userId));
  }

  friendshipCheck() {
    const { userFriends, visitedUser } = this.props
    for (let friend in userFriends) {
      if (visitedUser.uid === userFriends[friend]['uid']) {
        return true;
      }
    }

    return false;
  }

  sendFriendRequest() {
    const { visitedUser, user, isAuthenticated, userFetched } = this.props;
    if (isAuthenticated && userFetched) {
      sendNotification(visitedUser.uid, user.uid, 'action');
    }
  }

  render() {
    const isMobile = window.innerWidth < window.innerHeight;
    const { visitedUser, userFetched, isUserFetching } = this.props;
    if (userFetched && !isUserFetching) {
      const areFriends = this.friendshipCheck();
      const isMobile = window.innerWidth < window.innerHeight;
      return (
        <div>
          <HeaderBar />
          <div className={isMobile ? "account-page-container-mobile" : "account-page-container"}>
            {visitedUser.firstName}
            {!areFriends && <button type="button" onClick={() => this.sendFriendRequest()} > + Add Friend +</button>}
            <UserStats />
          </div>
          <TabBar show={isMobile} />
        </div>
      );
    }
    return (
      <div>
        <HeaderBar />
        <div>
          <Loader color="#00e676" type="Cradle-Loader" className="activity-indicator"/>
        </div>
        <TabBar show={isMobile} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    visitedUser: state.auth.visitedUser,
    userFetched: state.auth.userFetched,
    userFriends: state.auth.userFriends,
    isUserFetching: state.auth.isUserFetching,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(UserPage);