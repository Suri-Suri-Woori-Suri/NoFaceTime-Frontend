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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  console.log("AUTH SERVICE", authService);
  console.log("is Anonymous", authService.isAnonymous);
  console.log("ISLOGGEDIN", isLoggedIn);
  console.log("currentUser", currentUser);

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
                <Room currentUser={currentUser} setCurrentUser={setCurrentUser} />
              </Route>
              <Route path='/groups'>
                <Group currentUser={currentUser} setCurrentUser={setCurrentUser} />
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
                  setCurrentUser={setCurrentUser}
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
