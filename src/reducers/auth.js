import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  USER_REQUEST,
  USER_FAILURE,
  USER_SUCCESS,
  FRIENDS_FAILURE,
  FRIENDS_SUCCESS,
  FRIENDS_REQUEST,
  NOTIFICATION_FAILURE,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_REQUEST,
} from "../actions/";

export default (
  state = {
    isLoggingIn: false,
    isLoggingOut: false,

    isVerifying: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,

    isUserFetching: false,
    userFetchError: false,
    userFetched: false,
    user: {},
    visitedUser: {},

    isFetchingFriends: false,
    friendFetchError: false,
    friendFetchSuccess: false,
    userFriends: {},

    isFetchingNotifications: false,
    notificationFetchFailure: false,
    notificationFetchSuccess: false,
    userNotifs: {},
  },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false
      };
    
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user,
        isLoggedOut: false,
      };
      
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true
      };
        
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false,
      };
    
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        isLoggedOut: true,
        user: {}
      };
    
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true
      };
    
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false
      };
      
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false,
      };
    
    case USER_REQUEST:
      return {
        ...state,
        isUserFetching: true,
        userFetchError: false,
        userFetched: false,
      };
    
    case USER_FAILURE:
      return {
        ...state,
        isUserFetching: false,
        userFetchError: true,
        userFetched: false,
        loggedInUser: {}
      };
    
    case USER_SUCCESS:
      return {
        ...state,
        isUserFetching: false,
        userFetchError: false,
        userFetched: true,
        visitedUser: action.visitedUser,
      };
    
    case FRIENDS_FAILURE:
      return {
        ...state,
        isFetchingFriends: false,
        friendFetchError: true,
        friendFetchSuccess: false,
      };
    
    case FRIENDS_REQUEST:
      return {
        ...state,
        isFetchingFriends: true,
        friendFetchError: false,
        friendFetchSuccess: false,
      };
    
    case FRIENDS_SUCCESS:
      return {
        ...state,
        isFetchingFriends: false,
        friendFetchError: false,
        friendFetchSuccess: true,
        userFriends: action.userFriends,
      };

    case NOTIFICATION_REQUEST:
      return {
        ...state,
        isFetchingNotifications: true,
        notificationFetchFailure: false,
        notificationFetchSuccess: false,
      };
    
    case NOTIFICATION_FAILURE:
      return{
        ...state,
        isFetchingNotifications: false,
        notificationFetchSuccess: false,
        notificationFetchFailure: true,
      };
    
    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        isFetchingNotifications: false,
        notificationFetchFailure: false,
        notificationFetchSuccess: true,
        userNotifs: action.notifs,
      }
    
    default:
      return state;
    }
  };
  