import React from 'react';
import styles from './GroupContent.module.css';
import GroupList from '../GroupList/GroupList';
import ExistMemberList from '../MemberList/MemberList';

const GroupContent = (props) => {
  const {
    title,
    currentUser,
    setCurrentUser,
    setShowModal,
    showMember,
    setShowMember,
    existMember,
    setExistMember,
    fetchToServer,
    checkedGroups,
    setCheckedGroups
  } = props;


  const groups = currentUser.groups;

  const fetch = async () => {
    console.log('delete fetch');
    const data = await fetchToServer();
    console.log("###########", data);

    if ('rooms' in data) setCurrentUser({ ...currentUser, rooms: data.rooms });
    if ('groups' in data) setCurrentUser({ ...currentUser, groups: data.groups });
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
          setShowMember={setShowMember}
          setExistMember={setExistMember}
        />
      }
    </>
  );
};

export default GroupContent;
