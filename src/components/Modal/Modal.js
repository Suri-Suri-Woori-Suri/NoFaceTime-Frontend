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

  const closeModal = () => {
    setShowModal(false);
    if (setMembers) setMembers([]);
  };

  const toggle = () => {
    setIsFetched(!isFetched);
  };

  useEffect(() => {
    if (!isFetched) return;

    // [ createFunction ]
    // Room Page 라면 Create Room
    // Group Page의 Create Group면 Create Group function
    // Group Page의 Member Page면 Create member 이 들어올것임
    //const roomsData = await createFunction(currentUser, groupOrRoomInfo, members); // post group (make group) OR post add member

    const fetchData = async () => {
      const roomsData = await createFunction(currentUser, groupOrRoomInfo, members);
      console.log("$$$$$$$", roomsData);
      console.log("HERE", currentUser);
      setCurrentUser({ ...currentUser, rooms: roomsData });
    };
    fetchData();

    if (setMembers) setMembers([]);
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
