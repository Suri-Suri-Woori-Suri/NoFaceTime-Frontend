import React from 'react';
import styles from './CompleteButton.module.css';

const CompleteButton = ({
  currentUser,
  setCurrentUser,
  buttonName,
  fetchToServer,
  setExistMember,
  closeModal
}) => {

  const fetch = async () => {
    const data = await fetchToServer();
    console.log(data);

    if ('rooms' in data) setCurrentUser({ ...currentUser, rooms: data.rooms });
    if ('groups' in data) setCurrentUser({ ...currentUser, groups: data.groups });
    if ('updatedMembers' in data) setExistMember([...data.updatedMembers]);

    closeModal();
  };

  return (
    <button
      className={styles.CompleteButton}
      onClick={fetch}>
      {buttonName}
    </button>
  );
};

export default CompleteButton;
