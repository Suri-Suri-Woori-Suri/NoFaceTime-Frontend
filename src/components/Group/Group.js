import React from 'react';

import GroupList from '../GroupList/GroupList';
import MemberList from '../MemberList/MemberList';

import styles from './Group.module.css';

const Group = ({
  currentUser,
  showMember,
  setShowMember,
  getMemberData,
  handleCheckbox,
  targetGroupId,
  saveTargetGroupId
}) => {

  return (
    <>
      {showMember ?
        <MemberList
          currentUser={currentUser}
          targetGroupId={targetGroupId}
          setShowMember={setShowMember}
          handleCheckbox={handleCheckbox} />
        :
        <GroupList
          groups={currentUser.groups}
          onGroupItemClick={getMemberData}
          onGroupNameClick={saveTargetGroupId}
          handleCheckbox={handleCheckbox} />
      }
    </>
  );
};

export default Group;
