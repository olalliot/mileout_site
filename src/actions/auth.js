import { myFirebase } from "../firebase/firebase";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE
  };
};

export const logIn = (email, password) => dispatch => {
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      myFirebase
        .firestore()
        .collection('users')
        .doc(user.user.uid)
        .get()
        .then(user => {
          dispatch(receiveLogin(user.data()));
        })
        .catch(error => {
          console.log(error);
          dispatch(loginError());
        })
    })
    .catch(error => {
      console.log('Login error', error);
      dispatch(loginError());
    })
}

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
}

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
}

const logoutError = () => {
  return {
    type: LOGIN_FAILURE
  };
}

export const logOut = () => dispatch => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
      console.log('Logout error', error);
      dispatch(logoutError());
    })
}

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestVerify = () => {
  return {
    type: VERIFY_REQUEST
  };
}

const receiveVerify = () => {
  return {
    type: VERIFY_SUCCESS
  };
}

export const verifyAuth = () => dispatch => {
  dispatch(requestVerify())
  myFirebase
    .auth()
    .onAuthStateChanged(user => {
      if (user !== null) {
        dispatch(receiveLogin(user));
      }
      dispatch(receiveVerify());
    })
}

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILURE = "USER_FAILURE";


const requestUser = () => {
  return {
    type: USER_REQUEST
  };
}

const retrievedUser = visitedUser => {
  return {
    type: USER_SUCCESS,
    visitedUser
  };
}

const failedUser = () => {
  return {
    type: USER_FAILURE
  };
}

export const fetchUser = uid => dispatch => {
  if (!uid) throw Error;
  dispatch(requestUser());
  myFirebase
    .firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then(user => {
      dispatch(retrievedUser(user.data()));
    })
    .catch(error => {
      console.log(error);
      dispatch(failedUser());
    })
}

export const FRIENDS_REQUEST = "FRIENDS_REQUEST";
export const FRIENDS_SUCCESS = "FRIENDS_SUCCESS";
export const FRIENDS_FAILURE = "FRIENDS_FAILURE";

const requestFriends = () => {
  return {
    type: FRIENDS_REQUEST,
  };
}

const retrievedFriends = userFriends => {
  return {
    type: FRIENDS_SUCCESS,
    userFriends,
  };
}

const failureFriends = () => {
  return {
    type: FRIENDS_FAILURE,
  };
}

export const fetchFriends = uid => dispatch => {
  if (!uid) throw Error;
  dispatch(requestFriends());
  let tempArr = [];
  myFirebase
  .firestore()
  .collection('users')
  .doc(uid)
  .collection('friends')
  .get()
  .then(results => {
    results.forEach(result => {
      console.log(result.data());
      tempArr.push(result.data());
    })
  })
  .then(() => {
    dispatch(retrievedFriends(tempArr));
  })
  .catch(error => {
    console.log(error);
    dispatch(failureFriends());
  });
}

export const NOTIFICATION_REQUEST = "NOTIFICATION_REQUEST";
export const NOTIFICATION_FAILURE = "NOTIFICATION_FAILURE";
export const NOTIFICATION_SUCCESS = "NOTIFICATION_SUCCESS";

const requestNotification = () => {
  return {
    type: NOTIFICATION_REQUEST,
  };
}

const failureNotification = () => {
  return {
    type: NOTIFICATION_FAILURE,
  };
}

const successNotification = notifs => {
  return {
    type: NOTIFICATION_SUCCESS,
    notifs,
  };
}

export const fetchNotifications = uid => dispatch => {
  if (!uid) throw Error;
  dispatch(requestNotification());
  let tempArr = [];
  myFirebase
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('notifications')
    .get()
    .then(results => {
      results.forEach(result => {
        tempArr.push(result);
      })
    })
    .then(() => {
      dispatch(successNotification(tempArr.reverse()));
    })
    .catch(error => {
      console.log('something went wrong with the notifs', error);
      dispatch(failureNotification());
    })
}

export const setNotificationStatus = (val, uid) => {
  if (!uid) throw Error;
  const path = myFirebase.firestore().collection('users').doc(uid);
  path.update({
    hasNotifications: val,
  })
  .catch(error => {
    console.log('error setting notification status', error);
  })
}

export const sendNotification = (uid, senderUID, type) => {
  if (!uid) throw Error;
  const senderPath = myFirebase.firestore().collection('users').doc(senderUID);
  senderPath
  .get()
  .then(user => {
    return user.data();
  })
  .then(userInfo => {
    const id = Date.now();
    const path = myFirebase.firestore().collection('users').doc(uid).collection('notifications').doc(id.toString());
    let text = "";
    if (type === 'action') {
      text = userInfo.firstName + ' wants to add you as a friend';
    } else if (type === 'text') {
      text = userInfo.firstName + ' accepted your friend request';
    }
    path.set({
      text: text,
      type: type,
      sender: senderUID,
      timeSent: id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    })
  })
  .then(() => {
    setNotificationStatus(true, uid);
  })
  .catch(error => {
    console.log('something went wrong when sending the notification', error);
  })
}

export const updateNotification = (notifID, uid, newText, type) => {
  if (!uid || !notifID) throw Error;
  const notifPath = myFirebase.firestore().collection('users').doc(uid).collection('notifications').doc(notifID);
  notifPath.update({
    type: type,
    text: newText,
  })
  .catch(error => {
    console.log('error while updating notification', error);
  })
}

export const acceptFriendRequest = (uid, senderUID, firstName, lastName) => {
  if (!uid) throw Error;
  const newFriendPath = myFirebase.firestore().collection('users').doc(uid).collection('friends').doc(senderUID);
  newFriendPath.set({
    firstName : firstName,
    lastName: lastName,
    uid: senderUID
  })
}