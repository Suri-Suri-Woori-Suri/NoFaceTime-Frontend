import React from 'react';
import styles from './MemberList.module.css';

const MemberList = (props) => {
  const {
    currentUser,
    targetGroupId,
    setShowMember,
    handleCheckbox
  } = props;

  const targetGroup = currentUser.groups.filter(group => group._id === targetGroupId)[0];
  console.log(targetGroupId);
  console.log(targetGroup);
  const targetMember = targetGroup.members

  const existMemberList = targetMember.map((memberEmail, i) => {
    return (
      <div key={i}>
        <input
          type='checkbox'
          className={styles.Member}
          onChange={() => handleCheckbox(memberEmail)}
        />{memberEmail}
      </div>
    );
  });

  return (
    <div className={styles.Content}>{existMemberList}
      <button
        className={styles.Button}
        onClick={() => {
          setShowMember(false);
        }}>Go Back
      </button>
    </div>
  );
};

export default MemberList;
