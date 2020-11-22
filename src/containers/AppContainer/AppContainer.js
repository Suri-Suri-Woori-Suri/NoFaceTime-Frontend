import React, { useState } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import {
  createActionForUserData,
  createActionToAddRoom,
  createActionToDeleteRoom,
  createActionToAddGroup,
  createActionToDeleteGroups,
  createActionToAddMembers,
  createActionToDeleteMembers,
  createActionToJoinMembersInRoom,
  createActionToDeleteMembersInRoom
} from '../../actions';

import RoomContainer from '../RoomContainer/RoomContainer';
import GroupContainer from '../GroupContainer/GroupContainer';
import VideoContainer from '../VideoContainer/VideoContainer';
import Home from '../../components/Home/Home';
import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';
import Setting from '../../components/Setting/Setting';
import VideoConferenceRoom from '../../components/VideoConferenceRoom/VideoConferenceRoom';
import Video from '../../components/Video/Video';

const AppContainer = ({
  isLoggedIn,
  currentUser,
  updateUserData,
  addRooms,
  deleteRooms,
  addGroups,
  deleteGroups,
  addMembers,
  deleteMembers,
  memberInRoom,
  joinMember,
  deleteLeavingMember
}) => {
  const socket = io('localhost:5000');
  const roomLink = useRouteMatch("/rooms/:roomId");

  const checkRoomInvitationLink = () => {
    if (!roomLink) return;

    localStorage.roomLink = roomLink.url;
    localStorage.roomUUID = roomLink.params.roomId;
  };

  console.log('ISLOGGED IN???', isLoggedIn);
  console.log('CURRENT USER STATE', currentUser);
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [ishost, setIshost] = useState(false);
  console.log('ishost?', ishost);

  return (
    <div>
      <Switch>
        {
          isLoggedIn
            ? <>
              {joinedRoom
                ? <Route path='/rooms/:id'
                  render={(props) =>
                    <VideoConferenceRoom
                      location={props.location}
                      currentUser={currentUser}
                      setJoinedRoom={setJoinedRoom}
                      ishost={ishost}
                      memberInRoom={memberInRoom}
                      joinMember={joinMember}
                      deleteLeavingMember={deleteLeavingMember}
                    />} />
                : <Route path='/rooms/:id' render={(props) => <Setting location={props.location} setJoinedRoom={setJoinedRoom} />} />
              }
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
                  setIshost={setIshost}
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
              <Route
                path='/rooms/:id'
                render={(props) =>
                  <VideoContainer
                    socket={socket}
                    location={props.location} />} />
            </>
            : <>
              <Route exact path='/'>
                <Header />
                <Home />
              </Route>
              <Route path='/login'>
                <Header />
                <Login
                  updateUserData={updateUserData}
                  currentUser={currentUser} />
              </Route>
              <Route path='/rooms'>
                {
                  checkRoomInvitationLink()
                }
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
  const { userReducer, memberInRoomReducer } = state;

  return {
    currentUser: userReducer,
    isLoggedIn: userReducer.isLoggedIn,
    memberInRoom: memberInRoomReducer
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
    deleteMembers: (groupId, arrayOfEmail) => { dispatch(createActionToDeleteMembers(groupId, arrayOfEmail)); },
    joinMember: (socketId) => { dispatch(createActionToJoinMembersInRoom(socketId)); },
    deleteLeavingMember: (socketId) => { dispatch(createActionToDeleteMembersInRoom(socketId)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
