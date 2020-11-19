
import React from 'react';
import styles from './Group.module.css';
import GroupList from '../GroupList/GroupList';
import MemberList from '../MemberList/MemberList';

const Group = (props) => {
  const {
    currentUser,
    showMember,
    setShowMember,
    getMemberData,
    handleCheckbox,
    targetGroupId
  } = props;

  return (
    <>
      {showMember ?
        <MemberList
          currentUser={currentUser}
          targetGroupId={targetGroupId}
          setShowMember={setShowMember}
          handleCheckbox={handleCheckbox}
        /> :
        <GroupList
          currentUser={currentUser}
          getMemberData={getMemberData}
          handleCheckbox={handleCheckbox}
        />
      }
    </>
  );
};

export default Group;
