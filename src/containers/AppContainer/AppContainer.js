import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

import { authService } from '../../utils/firebase';

import Home from '../../components/Home/Home';
import Login from '../../components/Login/Login';
import Room from '../../components/Room/Room';
import Group from '../../components/Group/Group';

import styles from './AppContainer.module.css';

const AppContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <div className={styles.AppContainer}>
      <Switch>
        <Route exact path='/'>
          {
            isLoggedIn
              ? <Redirect to="/rooms" />
              : <Home />
          }
        </Route>
        <Route path='/login'>
          {
            isLoggedIn
              ? <Redirect to="/rooms" />
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

// const mapStateToProps = (state) => {
//   return {

//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {

//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

export default AppContainer;
