import React from 'react';

import CompleteButton from '../../components/CompleteButton/CompleteButton';
import CancelButton from '../../components/CancelButton/CancelButton';

import styles from './ModalContainer.module.css';

const ModalContainer = ({
  currentUser,
  setCurrentUser,
  setShowModal,
  newMembers, // members와 setmembers는 Group쪽에서 들어옴. Room과는 관계없음.
  setNewMembers, // members와 setmembers는 Group쪽에서 들어옴. Room과는 관계없음.
  fetchFunction,
  setExistMember,
  children
}) => {
  console.log("Modal Fatch Function", fetchFunction);

  const closeModal = () => {
    setShowModal(false);

    if (setNewMembers) setNewMembers([]);
  };

  const handleClickButton = async () => {
    const data = await fetchFunction();
    console.log("FETCH DATA", data);

    if ('rooms' in data) setCurrentUser({ ...currentUser, rooms: data.rooms });
    if ('groups' in data) setCurrentUser({ ...currentUser, groups: data.groups });
    if ('updatedMembers' in data) setExistMember([...data.updatedMembers]);

    closeModal();
  };

  return (
    <div className={styles.ModalBackground}>
      <div className={styles.Modal}>
        {children}
        <div className={styles.Buttons}>
          <CancelButton
            buttonName={'Cancel'}
            onClick={closeModal} />
          <CompleteButton
            buttonName={'Create'}
            onClick={handleClickButton}
          // currentUser={currentUser}
          // setCurrentUser={setCurrentUser}
          // setExistMember={setExistMember}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
