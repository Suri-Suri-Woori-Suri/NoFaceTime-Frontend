import React, { useState, useEffect } from 'react';
import styles from './GroupContent.module.css';
import GroupList from '../GroupList/GroupList';
import ExistMemberList from '../MemberList/MemberList';

const GroupContent = (props) => {
  const {
    title,
    currentUser,
    setShowModal,
    setgroupId,
    showMember,
    setShowMember,
    existMember,
    setExistMember,
    fetchFunction,
    checkedGroups,
    setCheckedGroups
  } = props;


  const groups = currentUser.groups;

  const fetch = async () => {
    console.log('delete fetch');
    await fetchFunction;
  };

  const popupModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <label className={styles.Title}>{title}</label>
      <div>
        <button className={`${styles.Button} ${styles.AddGroupButton}`} onClick={popupModal}>Add</button>
        <button className={`${styles.Button} ${styles.DeleteGroupButton}`} onClick={fetch}>Delete</button>
      </div>
      {showMember ?
        <ExistMemberList
          existMember={existMember}
          setShowMember={setShowMember}
        /> :
        <GroupList
          groups={groups}
          checkedGroups={checkedGroups}
          setCheckedGroups={setCheckedGroups}
          setgroupId={setgroupId}
          setShowMember={setShowMember}
          setExistMember={setExistMember}
        />
      }
    </>
  );
};

export default GroupContent;
