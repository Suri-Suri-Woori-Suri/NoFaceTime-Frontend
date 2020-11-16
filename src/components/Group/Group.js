import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Modal from '../Modal/Modal';
import GroupContent from '../GroupContent/GroupContent';
import styles from './Group.module.css';
import { createGroup, createMember } from '../../api';
import { deleteGroup, deleteMember } from '../../api/index';
import { getMember } from '../../api';

const Group = ({ currentUser, setCurrentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [memberName, setMemberName] = useState('');
  const [members, setMembers] = useState([]);
  const [showMember, setShowMember] = useState(false);
  const [groupId, setgroupId] = useState('');
  const [existMember, setExistMember] = useState([]);
  const title = showMember ? 'Member' : 'Your Groups'
  console.log(setMembers)

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

  const addNewMember = (event) => {
    event.preventDefault();
    setMembers([...members, memberName]);
  };

  const memberList = members.map((member, i) => {
    return <div key={i} className={styles.member}>{member}</div>
  });

  const createGroupModal = (
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
      <button className={styles.AddButton} onClick={addNewMember}>+</button>
      <div className={styles.Members}> added member
        {memberList}
      </div>
    </div>
  );

  const addMemberModal = (
    <div className={styles.ModalContent}>
      <div className={styles.ModalTitle}>Add Member</div>
      <input
        className={styles.Input}
        type='text'
        placeholder='Add Member'
        onChange={changeMemberName}
      />
      <button className={styles.AddButton} onClick={addNewMember}>+</button>
      <div className={styles.Members}> added member
      {memberList}
      </div>
    </div>
  );

  return (
    <div className={styles.Body}>
      {showModal &&
        (showMember ?
          <Modal
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowModal={setShowModal}
            createFunction={createMember}
            groupOrRoomInfo={groupId}
            members={members}
            setMembers={setMembers}
          >{addMemberModal}
          </Modal> :
          <Modal
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowModal={setShowModal}
            createFunction={createGroup}
            groupOrRoomInfo={groupName}
            members={members}
            setMembers={setMembers}
          >{createGroupModal}
          </Modal>
        )
      }
      <Sidebar />
      <div className={styles.ContentWrap}>
        <h1 className={styles.Hello}>Welcome!</h1>
        <div className={styles.Content}>
          <div className={styles.GroupContent}>
            {showMember ?
              <GroupContent
                title={title}
                currentUser={currentUser}
                setShowModal={setShowModal}
                setgroupId={setgroupId}
                showMember={showMember}
                setShowMember={setShowMember}
                existMember={existMember}
                deleteFunction={deleteMember}
              /> :
              <GroupContent
                title={title}
                currentUser={currentUser}
                setShowModal={setShowModal}
                setgroupId={setgroupId}
                setExistMember={setExistMember}
                showMember={showMember}
                setShowMember={setShowMember}
                existMember={existMember}
                deleteFunction={deleteGroup}
              />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
