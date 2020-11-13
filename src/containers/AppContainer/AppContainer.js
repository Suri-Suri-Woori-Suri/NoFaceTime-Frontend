import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

import { authService } from '../../config/firebase';

import Home from '../../components/Home/Home';
import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import Room from '../../components/Room/Room';
import Group from '../../components/Group/Group';

const AppContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <div>
      <Switch>
        {
          isLoggedIn
            ? <>
              <Route exact path='/'>
                <Header />
                <Home />
              </Route>
              <Route path='/login'>
                <Redirect to='/rooms' />
              </Route>
              <Route path='/rooms'>
                <Room />
              </Route>
              <Route path='/groups'>
                <Group />
              </Route>
            </>
            : <>
              <Route exact path='/'>
                <Header />
                <Home />
              </Route>
              <Route path='/login'>
                <Header />
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                />
              </Route>
              <Route path='/rooms'>
                <Redirect to='/login' />
              </Route>
              <Route path='/groups'>
                <Redirect to='/login' />
              </Route>
            </>
        }
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
