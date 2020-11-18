import React from 'react';

import CompleteButton from '../CompleteButton/CompleteButton';
import CancelButton from '../CancelButton/CancelButton';

import styles from './Modal.module.css';

const Modal = (props) => {
  const {
    currentUser,
    setCurrentUser,
    setShowModal,
    newMembers,//members와 setmembers는 Group쪽에서 들어옴. Room과는 관계없음.
    setNewMembers,//members와 setmembers는 Group쪽에서 들어옴. Room과는 관계없음.
    fetchFunction,
    setExistMember,
    children
  } = props;

  console.log("Modal Fatch Function", fetchFunction);

  const closeModal = () => {
    setShowModal(false);

    if (setNewMembers) setNewMembers([]);
  };

  return (
    <div className={styles.ModalBackground}>
      <div className={styles.Modal}>
        {children}
        <div>
          <CancelButton
            buttonName={'Cancel'}
            onClick={closeModal} />
          <CompleteButton
            buttonName={'Create'}
            fetchToServer={fetchFunction}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setExistMember={setExistMember}
            closeModal={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
