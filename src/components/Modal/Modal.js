import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = (props) => {
  const {
    currentUser,
    setCurrentUser,
    setShowModal,
    members,
    setMembers,
    groupOrRoomInfo,
    createFunction,
    children
  } = props;
  const [isFetched, setIsFetched] = useState(false);

  console.log(setMembers)

  // [ createFunction ]
  // Room Page 라면 Create Room
  // Group Page의 Create Group면 Create Group function
  // Group Page의 Member Page면 Create member 이 들어올것임

  const closeModal = () => {
    setShowModal(false);
    if (setMembers) setMembers([]);
  };

  const toggle = () => {
    setIsFetched(!isFetched);
  };

  useEffect(() => {
    if (!isFetched) return;

    createFunction(currentUser, groupOrRoomInfo, members); // post group (make group) OR post add member
    const mockData = [
      { id: 1, name: 'name1'},
      { id: 2, name: 'name2'},
      { id: 3, name: 'name3'},
      { id: 4, name: 'name4'}
    ];
    setCurrentUser({...currentUser, rooms: mockData});
    setMembers([]);
    toggle();
    closeModal();
  }, [isFetched]);

  return (
    <div className={styles.ModalBackground}>
      <div className={styles.Modal}>
        {children}
        <div>
          <button className={`${styles.Button} ${styles.CloseModalButton}`} onClick={closeModal}>Cancel</button>
          <button className={`${styles.Button} ${styles.CreateButton}`} onClick={toggle}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
