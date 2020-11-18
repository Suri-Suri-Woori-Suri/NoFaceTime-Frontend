import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  createActionForUserData,
  createActionToAddRoom,
  createActionToDeleteRoom,
  createActionToAddGroup,
  createActionToDeleteGroups,
  createActionToAddMembers,
  createActionToDeleteMembers
} from '../../actions';

import RoomContainer from '../RoomContainer/RoomContainer';
import Home from '../../components/Home/Home';
import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import Group from '../../components/Group/Group';
import Cam from '../../components/Cam/Cam';

const AppContainer = ({
  isLoggedIn,
  currentUser,
  setUserData,
  setDeleteRoom,
  setAddGroup,
  setDeleteGroup,
  setAddMembers,
  setDeleteMembers
}) => {

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
              <Route exact path='/rooms'>
                <RoomContainer
                  currentUser={currentUser}
                  setCurrentUser={setUserData} />
              </Route>
              <Route path='/groups'>
                <Group
                  currentUser={currentUser}
                  setCurrentUser={setUserData} />
              </Route>
              <Route path='/rooms/:id'>
                <Cam />
              </Route>
            </>
            : <>
              <Route exact path='/'>
                <Header />
                <Home />
              </Route>
              <Route path='/login'>
                <Header />
                <Login setCurrentUser={setUserData} />
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


const mapStateToProps = (state) => {
  console.log("MAP STATE TO PROPS", state);

  return {
    currentUser: state,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (userData) => { dispatch(createActionForUserData(userData)); },
    setAddRoom: (addedRoomData) => { dispatch(createActionToAddRoom(addedRoomData)); },
    setDeleteRoom: (id) => { dispatch(createActionToDeleteRoom(id)); },
    setAddGroup: (addedGroupData) => { dispatch(createActionToAddGroup(addedGroupData)); },
    setDeleteGroup: (arrayOfId) => { dispatch(createActionToDeleteGroups(arrayOfId)); },
    setAddMembers: (groupId, allMemberData) => { dispatch(createActionToAddMembers(groupId, allMemberData)); },
    setDeleteMembers: (groupId, arrayOfEmail) => { dispatch(createActionToDeleteMembers(groupId, arrayOfEmail)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
