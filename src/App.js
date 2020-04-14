import React from "react";

import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ricksPage from './ricks/ricksPage';
import skeepsPage from './skeeps/skeepsPage';
import aboutPage from './about/aboutPage';
import loginPage from './login/loginPage';
import betaTest from './betaTest';
import Home from './Home';
import accountPage from './account/accountPage';
import UserPage from './userPage';

function App(props) {

  return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/ricks' component={ricksPage} />
          <Route exact path='/skeeps' component={skeepsPage} />
          <Route exact path='/about' component={aboutPage} />
          <Route exact path='/login' component={loginPage} />
          <Route exact path='/beta-test' component={betaTest} />
          <Route exact path="/account" component={accountPage} />
          <Route exact path="/user/:userId" component={UserPage} />
        </div>
      </Router>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}
export default connect(mapStateToProps)(App);