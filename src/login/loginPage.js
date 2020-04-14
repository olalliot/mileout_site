import React from "react";
import { connect } from "react-redux";
import { logIn } from "../actions";
import TabBar from '../tabBar/tabBar';
import HeaderBar from '../headerBar/headerBar';
import { Link, Redirect } from 'react-router-dom';
import './loginPageStyles.css';
import padlock from './padlock.png';
import email from './email.png';

class loginPage extends React.Component {

  state = {
    email: '',
    password: '',
  };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = () => {
    console.log('submit');
    const { dispatch } = this.props;
    const { email, password } = this.state;
    dispatch(logIn(email, password));
  };

  render() {

    const { loginError, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <Redirect to={'/account'} />
      );
    } else {

      const isMobile = window.innerWidth < window.innerHeight;

      return (
        <div>
          <HeaderBar />
          <div className="login-form-container">
            <p className={isMobile ? "login-page-title-text-mobile" : "login-page-title-text"}> Login </p>
            <div className={isMobile ? "green-underline-box-mobile" : "green-underline-box"} />
            <div className="login-component">
              <img src={email} className="login-page-icon" alt="user" />
              <input
                name="email"
                placeholder="Email Address"
                className="login-form-input"
                onChange={this.handleEmailChange}
              />
            </div>
            <div className="login-component">
              <img src={padlock} className="login-page-icon" alt="password" />
              <input
                name="password"
                placeholder="Password"
                className="login-form-input"
                type="password"
                onChange={this.handlePasswordChange}
              />
            </div>
            {loginError && <p className="error-text-login">
              Incorrect Email or password
            </p>}
            <button type="button" className="login-page-submit" onClick={this.handleSubmit}> Continue </button>
            <br />
            <Link className="login-to-beta" to='/beta-test'>
              Want an account ?
            </Link>
          </div>
          <TabBar show={isMobile}/>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    visitedUser: state.auth.visitedUser
  };
}

export default connect(mapStateToProps)(loginPage);