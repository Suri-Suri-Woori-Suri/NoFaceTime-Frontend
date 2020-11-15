import React from 'react';
import styles from './MemberList.module.css';

const ExistMemberList = ({ existMember, setShowMember }) => {
  console.log('members', existMember)
  const existMemberList =  existMember.map((member, i) => {
    return (
      <div key={i}>
        <input type='checkbox' className={styles.Member} />{member}
      </div>
    );
  });

  return (
    <div className={styles.Content}>{existMemberList}
      <button className={styles.Button} onClick={() => setShowMember(false)}>Go Back</button>
    </div>
  );
};

export default ExistMemberList;
