import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Modal from '../Modal/Modal';
import GroupContent from '../GroupContent/GroupContent';
import styles from './Group.module.css';
import { createGroup, addMember, deleteRoom } from '../../api';
import { deleteGroups, deleteMember } from '../../api/index';
import { getMember } from '../../api';

const Group = ({ currentUser, setCurrentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [showMember, setShowMember] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [checkedGroups, setCheckedGroups] = useState([]);
  const [memberEmail, setMemberEmail] = useState('');
  const [newMembers, setNewMembers] = useState([]);
  const [existMember, setExistMember] = useState([]);
  const title = showMember ? 'Member' : 'Your Groups'

  const fetchTocreateGroup = () => createGroup(currentUser._id, groupName, newMembers);
  const fetchToDeleteGroups = () => deleteGroups(currentUser._id, checkedGroups);
  console.log(checkedGroups);
  //const fetchToAddMember

  const changeGroupName = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setGroupName(value);
  };

  const changeMemberEmail = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setMemberEmail(value);
  }

  const addNewMember = (event) => {
    event.preventDefault();
    setNewMembers([...newMembers, memberEmail]);
  };

  const newMemberList = newMembers.map((member, i) => {
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
        onChange={changeMemberEmail}
      />
      <button className={styles.AddButton} onClick={addNewMember}>+</button>
      <div className={styles.Members}> added member
        {newMemberList}
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
        onChange={changeMemberEmail}
      />
      <button className={styles.AddButton} onClick={addNewMember}>+</button>
      <div className={styles.Members}> added member
      {newMemberList}
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
            //fetchFunction={addMember}
            newMembers={newMembers}
            setNewMembers={setNewMembers}
          >{addMemberModal}
          </Modal> :
          <Modal
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setShowModal={setShowModal}
            fetchFunction={fetchTocreateGroup}
            newMembers={newMembers}
            setNewMembers={setNewMembers}
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
                showMember={showMember}
                setShowMember={setShowMember}
                existMember={existMember}
                //fetchFunction={deleteMember}
              /> :
              <GroupContent
                title={title}
                currentUser={currentUser}
                setShowModal={setShowModal}
                setExistMember={setExistMember}
                showMember={showMember}
                setShowMember={setShowMember}
                existMember={existMember}
                fetchFunction={fetchToDeleteGroups}
                checkedGroups={checkedGroups}
                setCheckedGroups={setCheckedGroups}
              />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
