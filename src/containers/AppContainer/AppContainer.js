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
import GroupContainer from '../GroupContainer/GroupContainer';
import Home from '../../components/Home/Home';
import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import Cam from '../../components/Cam/Cam';

const AppContainer = ({
  isLoggedIn,
  currentUser,
  updateUserData,
  addRooms,
  deleteRooms,
  addGroups,
  deleteGroups,
  addMembers,
  deleteMembers
}) => {
  console.log('ISLOGGED IN???', isLoggedIn);
  console.log('CURRENT USER STATE', currentUser);
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
                  addRooms={addRooms}
                  deleteRooms={deleteRooms}
                   />
              </Route>
              <Route path='/groups'>
                <GroupContainer
                  currentUser={currentUser}
                  addGroups={addGroups}
                  deleteGroups={deleteGroups}
                  addMembers={addMembers}
                  deleteMembers={deleteMembers}
                   />
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
                <Login updateUserData={updateUserData} />
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
    updateUserData: (userData) => { dispatch(createActionForUserData(userData)); },
    addRooms: (addedRoomData) => { dispatch(createActionToAddRoom(addedRoomData)); },
    deleteRooms: (id) => { dispatch(createActionToDeleteRoom(id)); },
    addGroups: (addedGroupData) => { dispatch(createActionToAddGroup(addedGroupData)); },
    deleteGroups: (arrayOfId) => { dispatch(createActionToDeleteGroups(arrayOfId)); },
    addMembers: (groupId, allMemberData) => { dispatch(createActionToAddMembers(groupId, allMemberData)); },
    deleteMembers: (groupId, arrayOfEmail) => { dispatch(createActionToDeleteMembers(groupId, arrayOfEmail)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
