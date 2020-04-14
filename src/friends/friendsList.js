import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Loader from '../constants/Loader';
import { fetchFriends  } from '../actions';
import './friendsListStyles.css';

class FriendsList extends React.Component {

  componentDidMount() {

    const { isAuthenticated, uid, dispatch } = this.props;
    if (isAuthenticated) {
      dispatch(fetchFriends(uid));
    }
  }

  render() {

    const {userFriends, friendFetchSuccess} = this.props;
    if (!friendFetchSuccess) {
      return (
        <div>
          <Loader />
        </div>
      );
    } else if (friendFetchSuccess && userFriends.length === 0) {
      return (
        <div>
          <p> Add friends now to see where they're going out!</p>
        </div>
      );
    } else {
      return(
        <div className="friend-list-container">
          {userFriends.map((friend, index) => {
            return (<Link 
                      className="friend-name-text"
                      key={index}
                      to={'/user/' + friend.uid}
                    > 
                      {friend.firstName} {friend.lastName} <br/>
                    </Link>);
          })}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    userFriends: state.auth.userFriends,
    isAuthenticated: state.auth.isAuthenticated,
    friendFetchSuccess: state.auth.friendFetchSuccess,
  };
}

export default connect(mapStateToProps)(FriendsList);