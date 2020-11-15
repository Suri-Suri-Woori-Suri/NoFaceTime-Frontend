import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = (props) => {
  const {
    currentUser,
    setCurrentUser,
    setShowModal,
    groupName,
    members,
    setMembers,
    roomName,
    createFunction,
    children
  } = props;

  console.log(groupName);
  console.log(members);

  //createFunction 에는 Room Page 라면 Create Room, Group Page면 Create Group function 이 들어올것임
  const [isFetched, setIsFetched] = useState(false);
  console.log("isFetched?", isFetched);
  console.log('currentUser', currentUser);
  const closeModal = () => {
    setShowModal(false);
  };

  const toggle = () => {
    setIsFetched(!isFetched);
  };

  useEffect(() => {
    if (!isFetched) return;
    //createFunction(currentUser, roomName); @@@@@@@@
    createFunction(currentUser, groupName, members); // post group (make group)
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