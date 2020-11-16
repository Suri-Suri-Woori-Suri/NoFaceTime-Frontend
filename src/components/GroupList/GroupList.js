import React, { useState, useEffect } from 'react';
import styles from './GroupList.module.css';
import { getMember } from '../../api';

const GroupList = ({ groups, checkedGroup, setCheckedGroup, setgroupId, setShowMember, setExistMember }) => {
  const [isFetched, setIsFetched] = useState(false);

  //toggle 변수명 수정??
  const toggle = (groupId) => {
    console.log('Get Member Toggle');
    setgroupId(groupId);
    setIsFetched(!isFetched);
  };

  useEffect(() => {
    if (!isFetched) return;
    console.log('Get Member!!!!');
    //getMember(groupId);

    const response = [1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6];
    setExistMember([...response]);
    setIsFetched(false);
    setShowMember(true);
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

  const groupList = groups ? groups.map((group, i) => {
    return (
      <div key={i}>
        <input
          type='checkbox'
          onChange={() => onChange(group._id)}
        />
        <button key={i} className={styles.Group} onClick={() => toggle(group._id)}>
          {group.name}
        </button>
      </div>

    );
  }) : undefined;

return <div className={styles.Groups}>{groupList}</div>
};

export default GroupList;
