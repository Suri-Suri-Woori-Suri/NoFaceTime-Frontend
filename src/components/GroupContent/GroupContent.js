import React, { useState, useEffect } from 'react';
import styles from './GroupContent.module.css';
//import { deleteGroup } from '../../api/index';

const GroupContent = ({ currentUser, setShowModal }) => {
  console.log(currentUser)
  const [checkedGroup, setCheckedGroup] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  console.log('checkedGroup', checkedGroup)
  console.log('isFetched Deleting Group', isFetched);
  //const groups = currentUser.Groups;
  const groups = [// this is mock
    { _id: 1, name: "Group1", members: [1, 2, 3] },
    { _id: 2, name: "Group2", members: [1, 2, 3] },
    { _id: 3, name: "Group3", members: [1, 2, 3] }
  ];

  const toggle = () => {
    console.log('Toggle deleteGroup');
    setIsFetched(!isFetched);
  };

  useEffect(() => {
    if (!isFetched) return;

    console.log('deleteGroup!!!!');

    // deleteGroup(currentUser, checkedGroup);
    // 가져온 값으로 CurrentUser의 group정보 바꾸기. group을 따로 관리해야할까 currentUser하나면 될까?
    // setCurrentUser ??
    setCheckedGroup([]);
    toggle();
    setIsFetched(!isFetched);
  }, [isFetched]);

  const onChange = groupId => {
    const clickedGroup = checkedGroup.indexOf(groupId);
    const currentCheckedGroup = [...checkedGroup];

    if (clickedGroup === -1) {
      currentCheckedGroup.push(groupId);
    } else {
      currentCheckedGroup.splice(clickedGroup, 1);
    }

    setCheckedGroup([...currentCheckedGroup]);
  };

  const popupModal = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const groupList = groups ? groups.map((group, i) => {
    return (
      <div key={i} className={styles.Group}>
        <input
          type='checkbox'
          onChange={() => onChange(group._id)}
        />
        {group.name}
      </div>
    );
  }) : undefined;

  return (
    <div className={styles.Content}>
      <div className={styles.GroupContent}>
        <label className={styles.Title}>Your Group</label>
        <div>
          <button className={`${styles.Button} ${styles.AddGroupButton}`} onClick={popupModal}>Add</button>
          <button className={`${styles.Button} ${styles.DeleteGroupButton}`} onClick={toggle}>Delete</button>
        </div>
        <div className={styles.Groups}>GroupList
          {groupList}
        </div>
      </div>
    </div>
  );
};

export default GroupContent;
