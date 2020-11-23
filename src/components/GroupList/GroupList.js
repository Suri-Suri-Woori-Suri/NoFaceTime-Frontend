import React from 'react';
import styles from './GroupList.module.css';

const GroupList = (props) => {
  const {
    currentUser,
    getMemberData,
    handleCheckbox,
  } = props;

  const groups = currentUser.groups;
  const groupList = groups ? groups.map((group, i) => {
    const groupId = group._id;
    return (
      <div className={styles.GroupEntry} key={i}>
        <input
          type='checkbox'
          onChange={() => handleCheckbox(groupId)}
        />
        <button key={i} className={styles.Group} onClick={() => getMemberData(groupId)}>
          {group.name}
        </button>
      </div>

    );
  }) : undefined;

  return (
    <div className={styles.GroupList}>
      {groupList}
    </div>
  );
};

export default GroupList;
