import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../../components/Home/Home';
import Login from '../../components/Login/Login';
import Room from '../../components/Room/Room';
import Group from '../../components/group/group';

import styles from './AppContainer.module.css';

function AppContainer({ }) {
  const [isLoggedIn, setISLoggedIn] = useState(false);

  return (
    <div className={styles.AppContainer}>
      <Switch>
        <Route exact path='/'>
          {
            isLoggedIn
              ? <Room />
              : <Home />
          }
        </Route>
        <Route path='/login'>
          {
            isLoggedIn
              ? <Room />
              : <Login />
          }
        </Route>
        <Route path='/rooms'>
          <Room />
        </Route>
        <Route path='/groups'>
          <Group />
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
