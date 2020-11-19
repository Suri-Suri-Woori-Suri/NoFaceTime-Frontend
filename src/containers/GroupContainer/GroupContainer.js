import React, { useState } from 'react';
import styles from './GroupContainer.module.css';
import { createGroup, addMember } from '../../api';
import { deleteGroup, deleteMember } from '../../api';
import ModalContainer from '../ModalContainer/ModalContainer';
import Group from '../../components/Group/Group';
import Sidebar from '../../components/Sidebar/Sidebar';

const GroupContainer = ({ currentUser, addGroups, deleteGroups, addMembers, deleteMembers }) => {
  const [showModal, setShowModal] = useState(false);
  const [showMember, setShowMember] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [targetGroupId, setTargetGroupId] = useState(null);
  const [checkedGroups, setCheckedGroups] = useState([]);
  const [memberEmail, setMemberEmail] = useState('');
  const [checkedMembers, setCheckedMembers] = useState([]);
  const [newMembers, setNewMembers] = useState([]);

  const onChange = (emailOrId, selectedArray, setSelectedArray) => {
    const selected = selectedArray.indexOf(emailOrId);

    if (selected === -1) {
      setSelectedArray([...selectedArray, emailOrId]);
    } else {
      const filtered = selectedArray.filter((item) => item !== emailOrId);
      setSelectedArray([...filtered]);
    }
  };

  const fetchTocreateGroup = () => createGroup(currentUser._id, groupName, newMembers);
  const fetchToDeleteGroups = () => deleteGroup(currentUser._id, checkedGroups);
  const fetchToAddMember = () => addMember(targetGroupId, newMembers);
  const fetchToDeletemembers = () => deleteMember(targetGroupId, checkedMembers);

  const fetch = async () => {
    console.log('CHECKED GROUPS', checkedGroups);
    console.log('CHECKED MEBMERS', checkedMembers);
    if (showMember) {
      deleteMembers(targetGroupId, checkedMembers);
      setCheckedMembers([]);
    } else {
      deleteGroups(checkedGroups);
      setCheckedGroups([]);
    }

    await fetchToDelete();
    return;
  };

  const changeGroupName = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setGroupName(value);
  };

  const changeMemberEmail = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setMemberEmail(value);
  };

  const addNewMember = (event) => {
    event.preventDefault();
    setNewMembers([...newMembers, memberEmail]);
  };

  const newMemberList = newMembers.map((member, i) => {
    return <div key={i} className={styles.member}>{member}</div>;
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

  const popupModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const getMemberData = async (groupId) => {
    setTargetGroupId(groupId);
    setShowMember(true);
  };

  const title = showMember ? 'Member' : 'Your Groups'
  const fetchToDelete = showMember ? fetchToDeletemembers : fetchToDeleteGroups;
  const fetchToCreate = showMember ? fetchToAddMember : fetchTocreateGroup;
  const modalContent = showMember ? addMemberModal : createGroupModal;
  const handleCheckbox = showMember ?
    (memberEmail) => onChange(memberEmail, checkedMembers, setCheckedMembers) :
    (targetGroup) => onChange(targetGroup, checkedGroups, setCheckedGroups);

  const addAndUpdateUserState = showMember ? addMembers : addGroups;

  return (
    <div className={styles.Body}>
      {showModal &&
        <ModalContainer
          currentUser={currentUser}
          addAndUpdateUserState={addAndUpdateUserState}////////  REDUX DISPATCH ADD ROOM
          setShowModal={setShowModal}
          fetchToCreate={fetchToCreate}
          setNewMembers={setNewMembers}
        >{modalContent}
        </ModalContainer>
      }
      <Sidebar />
      <div className={styles.ContentWrap}>
        <h1 className={styles.Hello}>Welcome!</h1>
        <div className={styles.Content}>
          <div className={styles.Group}>
            <label className={styles.Title}>{title}</label>
            <div>
              <button className={`${styles.Button} ${styles.AddButton}`} onClick={popupModal}>Add</button>
              <button className={`${styles.Button} ${styles.DeleteButton}`} onClick={fetch}>Delete</button>
            </div>
            <Group
              targetGroupId={targetGroupId}
              currentUser={currentUser}
              showMember={showMember}
              setShowMember={setShowMember}
              getMemberData={getMemberData}
              handleCheckbox={handleCheckbox}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupContainer;
