import React from 'react';

import CompleteButton from '../../components/CompleteButton/CompleteButton';
import CancelButton from '../../components/CancelButton/CancelButton';
import styles from './ModalContainer.module.css';

const ModalContainer = ({
  currentUser,
  addAndUpdateUserState,
  setShowModal,
  fetchToCreate,
  setNewMembers,
  setExistMember,
  children
}) => {
  const closeModal = () => {
    setShowModal(false);

    if (setNewMembers) setNewMembers([]);
  };

  const handleClickButton = async () => {
    const data = await fetchToCreate();

    if ('rooms' in data) addAndUpdateUserState(data.rooms);
    if ('groups' in data) addAndUpdateUserState(data.groups);
    if ('members' in data) addAndUpdateUserState(data.groupId, data.members);

    closeModal();
  };

  return (
    <div className={styles.ModalBackground}>
      <div className={styles.Modal}>
        <div className={styles.ModalContent}>
          {children}
          <div className={styles.Buttons}>
            <CancelButton
              buttonName={'Cancel'}
              onClick={closeModal} />
            <CompleteButton
              buttonName={'Create'}
              onClick={handleClickButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
