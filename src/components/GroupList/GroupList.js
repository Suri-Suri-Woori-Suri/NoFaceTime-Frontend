import React, { useState, useEffect } from 'react';
import styles from './GroupList.module.css';
import { getMembers } from '../../api';

const GroupList = (props) => {
  const {
    groups,
    checkedGroups,
    setCheckedGroups,
    setShowMember,
    setExistMember
  } = props;
  const [targetGroupId, setTargetGroupId] = useState(null);

  const fetch = async () => {
    console.log('Get Member!!!!');
    const data = await getMembers(targetGroupId);
    console.log(data);
    // const response = [1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6];
    // setExistMember([...response]);
    //setShowMember(true);
  };

  const onChange = groupId => {
    const clickedGroup = checkedGroups.indexOf(groupId);
    const currentCheckedGroups = [...checkedGroups];

    if (clickedGroup === -1) {
      currentCheckedGroups.push(groupId);
    } else {
      currentCheckedGroups.splice(clickedGroup, 1);
    }

    setCheckedGroups([...currentCheckedGroups]);
  };

  const groupList = groups ? groups.map((group, i) => {
    return (
      <div key={i}>
        <input
          type='checkbox'
          onChange={() => onChange(group._id)}
        />
        <button key={i} className={styles.Group} onClick={fetch}>
          {group.name}
        </button>
      </div>

    );
  }) : undefined;

return <div className={styles.Groups}>{groupList}</div>
};

export default GroupList;
