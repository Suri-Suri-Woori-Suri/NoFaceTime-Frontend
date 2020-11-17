import React from 'react';
import styles from './MemberList.module.css';

const ExistMemberList = (props) => {
  const {
    existMember,
    setShowMember,
    checkedMembers,
    setCheckedMembers,
  } = props;

  const onChange = memberEmail => {
    const selected = checkedMembers.indexOf(memberEmail);
    const currentChecked = [...checkedMembers];

    if (selected === -1) {
      currentChecked.push(memberEmail);
    } else {
      currentChecked.splice(selected, 1);
    }
    setCheckedMembers([...currentChecked]);
  };

  console.log('existMember!!!!!', existMember);
  const existMemberList = existMember.map((memberEmail, i) => {
    return (
      <div key={i}>
        <input
          type='checkbox'
          className={styles.Member}
          onChange={() => onChange(memberEmail)}
        />{memberEmail}
      </div>
    );
  });

  return (
    <div className={styles.Content}>{existMemberList}
      <button
        className={styles.Button}
        onClick={() => {
          setShowMember(false);
        }}>Go Back
      </button>
    </div>
  );
};

export default ExistMemberList;
