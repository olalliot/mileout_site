import React from "react";
import { connect } from "react-redux";
import TabBar from '../tabBar/tabBar';
import HeaderBar from '../headerBar/headerBar';
import FriendsList from '../friends/friendsList';
import UserStats from '../userStats';
import { Redirect } from 'react-router-dom';
import { logOut, fetchUser, setNotificationStatus } from '../actions';
import Loader from 'react-loader-spinner';
import './accountPageStyles.css';
import settingsButton from '../settingsButton.png';
import notifications from '../notifications.png';
import notificationsActive from '../notificationsActive.png';
import Modal from 'react-modal';
import NotificationScreen from './notificationScreen';
import close from '../close.png';

Modal.setAppElement(document.getElementById('root'));

const customStyles = {
  content : {
    top                   : '50%',
    height: '75%',
    width                 : '40%',
    bottom                : 'auto',
    transform             : 'translate(50%, -50%)'
  }
};

const customStylesMobile = {
  content : {
    top                   : '50%',
    height: '75%',
    width                 : '75%',
    bottom                : 'auto',
    transform             : 'translate(-4%, -50%)'
  }
};

class accountPage extends React.Component {

  state = {
    showStats: true,
    showFriends: false,
    modalIsOpen: false,
    hasNotifications: true,
  };

  componentDidMount() {
    const { dispatch, user, isAuthenticated, isLoggingIn } = this.props;
    if (isAuthenticated && !isLoggingIn) dispatch(fetchUser(user.uid));
  }

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logOut());
  }
  
  pickerView = val => {
    if (val) {
      this.setState({
        showStats: false,
        showFriends: true,
      })
    } else {
      this.setState({
        showStats: true,
        showFriends: false,
      })
    }
  } 

  showModalNotif() {
    const { visitedUser } = this.props;
    if (visitedUser.uid) setNotificationStatus(false, visitedUser.uid);
    this.setState({
      modalIsOpen: true,
      hasNotifications: false,
    });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {

    const { isAuthenticated, userFetched, isUserFetching, visitedUser } = this.props;
    const { showStats, showFriends } = this.state;
    const isMobile = window.innerWidth < window.innerHeight;

    if (!isAuthenticated) {
      return (
        <Redirect to='/login' />
      );
    } else if (!isUserFetching && userFetched) {
        return(
          <div>
            <HeaderBar page="Account"/>
            <div className={isMobile ? "account-page-container-mobile" : "account-page-container"}>
              <div className="profile-header">
                <p className="profile-name"> Hey {visitedUser.firstName} </p>
                <div className="action-container">
                  <button type="button" onClick={() => console.log('settings')} className="profile-buttons">
                    <img src={settingsButton} alt="settings" className="profile-actions"/>
                  </button>
                  <button type="button" onClick={() => this.showModalNotif()} className="profile-buttons">
                    <img src={(visitedUser.hasNotifications && this.state.hasNotifications) ? notificationsActive : notifications}
                      alt="notifications"
                      className="profile-actions"
                    />
                  </button>
                </div>
              </div>

              <div className="picker-view-account">
                <button type="button" onClick={() => this.pickerView(0)}>
                  Activity
                </button>
                <button type="button" onClick={() => this.pickerView(1)}>
                  Friends
                </button>
                {showStats &&  <UserStats />}
                {showFriends && <FriendsList uid={visitedUser.uid} />}
              </div>
              <button type="button" onClick={this.handleLogout} > Logout </button>
            </div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={() => this.closeModal()}
              contentLabel="Example Modal"
              style={isMobile ? customStylesMobile : customStyles}
            >
              <div>
                <div className="modal-header">
                  <p className="modal-title">
                    Notifications
                  </p>
                  <button type="button" onClick={() => this.closeModal()} className="modal-button">
                    <img src={close} alt="close" className="modal-close"/>
                  </button>
                </div>
                <NotificationScreen uid={visitedUser.uid}/>
              </div>
            </Modal>
            <TabBar show={isMobile}/>
          </div>
        );
    } else {
      return (
        <div>
          <HeaderBar />
            <Loader color="#00e676" type="CradleLoader" className="activity-indicator"/>
          <TabBar show={isMobile} />
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isLoggingIn: state.auth.isLoggingIn,
    isAuthenticated: state.auth.isAuthenticated,
    visitedUser: state.auth.visitedUser,
    userFetched: state.auth.userFetched,
    isUserFetching: state.auth.isUserFetching,
  };
}

export default connect(mapStateToProps)(accountPage);