import React from 'react';
import styles from './GroupList.module.css';
import { getMembers } from '../../api';

const GroupList = (props) => {
  const {
    groups,
    checkedGroups,
    setCheckedGroups,
    setShowMember,
    setExistMember,
    setTargetGroup
  } = props;

  const fetch = async (groupId) => {
    console.log('Get Member!!!!');
    console.log(groupId);
    const members = await getMembers(groupId);
    setExistMember([...members]);
    setTargetGroup(groupId);
    setShowMember(true);
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
    const groupId = group._id;
    return (
      <div key={i}>
        <input
          type='checkbox'
          onChange={() => onChange(groupId)}
        />
        <button key={i} className={styles.Group} onClick={() => fetch(groupId)}>
          {group.name}
        </button>
      </div>

    );
  }) : undefined;

return <div className={styles.Groups}>{groupList}</div>
};

export default GroupList;
