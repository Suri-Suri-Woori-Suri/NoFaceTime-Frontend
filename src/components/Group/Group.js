import React, { useState, useEffect } from 'react';
import styles from './Group.module.css';
import Sidebar from '../Sidebar/Sidebar';
import Modal from '../Modal/Modal';
import GroupContent from '../GroupContent/GroupContent';
import { createGroup } from '../../api';
// import { getMember } from '../../api';

const Group = ({ currentUser, setCurrentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [memberName, setMemberName] = useState('');
  const [members, setMembers] = useState([]);
  const [showMember, setShowMember] = useState(false);
  const [groupId, setgroupId] = useState('');
  const [existMember, setExistMember] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const title = showMember ? 'Member' : 'Your Groups'

  useEffect(() => {
    if (!isFetched) return;
    console.log('Get Member!!!!');

    //getMember(groupId);
    const response = [1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6];
    setExistMember([...response]);
    setIsFetched(false);
    setShowMember(true);
  }, [isFetched]);

  const setGroupIdAndFetch = (groupId) => {
    console.log('Get Member Toggle');
    setgroupId(groupId);
    setIsFetched(!isFetched);
  };

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
    setMembers([...members, memberName]);
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

  {/* {showMember? <div>show member</div> : <GroupContent1 currentUser={currentUser} setShowModal={setShowModal} setShowMember={setShowMember}/>} */ }

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
        <h1 className={styles.Hello}>Welcome!</h1>
        <div className={styles.Content}>
          <div className={styles.GroupContent}>
            <label className={styles.Title}>{title}</label>
            <div>
              <button className={`${styles.Button} ${styles.AddGroupButton}`} onClick={() => console.log('popupModal')}>Add</button>
              <button className={`${styles.Button} ${styles.DeleteGroupButton}`} onClick={() => console.log('toggle')}>Delete</button>
            </div>
            <GroupContent
              currentUser={currentUser}
              setShowModal={setShowModal}
              setgroupId={setgroupId}
              setGroupIdAndFetch={setGroupIdAndFetch}
              showMember={showMember}
              setShowMember={setShowMember}
              existMember={existMember}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
