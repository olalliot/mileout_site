import React from 'react';
import { connect } from 'react-redux';
import Loader from '../constants/Loader';
import { fetchNotifications, acceptFriendRequest, updateNotification, sendNotification } from '../actions';
import './notificationScreenStyles.css';

class NotificationScreen extends React.Component {

  componentDidMount() {
    const { dispatch, user, uid } = this.props;
    dispatch(fetchNotifications(uid));
  }

  acceptRequest(notifID, firstName, lastName, sender) {
    const { visitedUser, dispatch, uid } = this.props;
    if (visitedUser.uid) {
      acceptFriendRequest(visitedUser.uid, sender, firstName, lastName);
      acceptFriendRequest(sender, visitedUser.uid, visitedUser.firstName, visitedUser.lastName)
      const newVal = 'You accepted ' + firstName + "'s friend request";
      updateNotification(notifID, visitedUser.uid, newVal, 'text');
      sendNotification(sender, uid, 'text');
      dispatch(fetchNotifications(uid));
    }
  }

  denyRequest(notifID, firstName) {
    const { visitedUser, dispatch, uid } = this.props;
    if (visitedUser.uid) {
      const newVal = 'You accepted ' + firstName + "'s friend request";
      updateNotification(notifID, visitedUser.uid, newVal, 'ignore');
      dispatch(fetchNotifications(uid));
    }
  }

  renderNotification(notif, index) {
    if (notif.data().type ==='action') {
      console.log(notif.id);
      return (
        <div className="notification-container" key={index}>
          <p className="notification-text">
            {notif.data().text}
          </p>
          <button
            type="button"
            onClick={() => this.acceptRequest(notif.id, notif.data().firstName, notif.data().lastName, notif.data().sender)}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => this.denyRequest(notif.id, notif.data().firstName)}
          >
            Deny
          </button>
        </div>
      );
    } else if (notif.data().type === 'text') {
      return (
        <div className="notification-container" key={index}>
          <p className="notification-text">
            {notif.data().text}
          </p>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { userNotifs, isFetchingNotifications, notificationFetchSuccess} = this.props;
    if (isFetchingNotifications) {
      return (
        <div>
          <Loader />
        </div>
      );
    } else if (notificationFetchSuccess) {
      return (
        <div  className="all-notification-container">
          {userNotifs.map((n, index) => {
            return (this.renderNotification(n, index));
          })}
      </div>
      );
    } else {
      return (
        <div>
          <p> Something went wrong </p>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    visitedUser: state.auth.visitedUser,
    userNotifs: state.auth.userNotifs,
    notificationFetchSuccess: state.auth.notificationFetchSuccess,
    isFetchingNotifications: state.auth.isFetchingNotifications,
  };
}

export default connect(mapStateToProps)(NotificationScreen);