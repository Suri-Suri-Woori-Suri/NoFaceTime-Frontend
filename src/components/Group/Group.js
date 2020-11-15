import React, { useState } from 'react';
import styles from './Group.module.css';
import Sidebar from '../Sidebar/Sidebar';
import Modal from '../Modal/Modal';
import GroupContent from '../GroupContent/GroupContent';
import { createGroup } from '../../api';

const Group = ({ currentUser, setCurrentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [memberName, setMemberName] = useState('');
  const [members, setMembers] = useState([]);

  console.log('Group, currentUser', currentUser);
  console.log('Group, GroupName', groupName);
  console.log('Group, Members', members);

  const changeGroupName = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setGroupName(value);
  };

  const changeMemberName = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setMemberName(value);
  }

  const addMember = (event) => {
    event.preventDefault();
    setMembers([ ...members, memberName ]);
  };

  const memberList = members.map((member, i) => {
    return <div key={i} className={styles.member}>{member}</div>
  });

  const modalContent = (
    <div className={styles.ModalContent}>
      <div className={styles.ModalTitle}>Create group</div>
      <input
        className={styles.Input}
        type='text'
        placeholder='Group Name'
        onChange={changeGroupName}
      />
      <input
        className={`${styles.Input} ${styles.InputMember}`}
        type='text'
        placeholder='Add Member'
        onChange={changeMemberName}
      />
      <button className={styles.AddButton} onClick={addMember}>+</button>
      <div className={styles.Members}> added member
        {memberList}
      </div>
    </div>
  );

  return (
    <div className={styles.Body}>
      {showModal &&
        <Modal
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setShowModal={setShowModal}
          createFunction={createGroup}
          groupName={groupName}
          members={members}
          setMembers={setMembers}
          >{modalContent}
        </Modal>}
      <Sidebar />
      <div className={styles.ContentWrap}>
        <h1 className={styles.Title}>Welcome!</h1>
        <GroupContent currentUser={currentUser} setShowModal={setShowModal} />
      </div>
    </div>
  );
};

export default Group;
