import React from 'react';
import styles from './MemberList.module.css';

const MemberList = ({
  currentUser,
  targetGroupId,
  handleCheckbox
}) => {
  const targetGroup = currentUser.groups.filter(group => group._id === targetGroupId)[0];
  const targetMember = targetGroup.members;
  const existMemberList = targetMember.map((memberEmail, index) => {
    return (
      <div
        key={index}
        className={styles.MemberEntry}>
        <input
          type='checkbox'
          onChange={() => handleCheckbox(memberEmail)} />
        {memberEmail}
      </div>
    );
  });

  return (
    <div className={styles.MemberList}>
      {existMemberList}
    </div>
  );
};

export default MemberList;
