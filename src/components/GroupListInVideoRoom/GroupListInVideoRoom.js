import React, { useState } from 'react';
import styles from './GroupListInVideoRoom.module.css';

import { sendMailToMembers } from '../../api';
//sendMailToMembers = async (sender, receiver, roomLink, groupId)
import CompleteButton from '../CompleteButton/CompleteButton';

const GroupListInVideoRoom = ({
  groups,
  host
}) => {
  const [isShowMembers, setIsShowMembers] = useState(false);
  const [clickedGroupId, setClickedGroupId] = useState("");
  const [membersToShow, setMembersToShow] = useState([]);

  console.log("Groups", groups);
  console.log("HOST", host);
  console.log("MEMBERS", membersToShow);
  console.log("CLICKED GROUPID", clickedGroupId);

  const roomLink = document.location.href;

  const onGroupNameClick = (clickedGroupId) => {
    if (!clickedGroupId) {
      alert('초대할 그룹을 선택해주세요!');
      return;
    }
    setIsShowMembers(!isShowMembers);
    setClickedGroupId(clickedGroupId);

    groups.forEach((group) => {
      if (group._id === clickedGroupId) {
        setMembersToShow(group.members);
      }
    });
  };

  return (
    <div className={styles.GroupListInVideoRoom}>
      <div
        className={styles.SendMailButton}>

        <CompleteButton

          buttonName="Send Mail"
          onClick={() => {
            console.log("!!!!!! 클릭했음");
            console.log("HOST", host);
            console.log("Members", membersToShow);
            console.log("roomLink", roomLink);
            console.log("clickedGroupId", clickedGroupId);
            sendMailToMembers(host, membersToShow, roomLink, clickedGroupId);
          }} />

      </div>
      {
        groups.map((group, index) => {
          return (
            <div className={styles.GroupEntry}>
              <label className={styles.GroupLabel}>
                <input type='radio' name='groupCheckbox' />
                <div
                  key={index}
                  id={group._id}
                  className={styles.GroupName}
                  onClick={(e) => {
                    console.log(e.target.id);
                    onGroupNameClick(e.target.id);
                  }} >
                  {group.name}
                  {
                    isShowMembers &&
                    group._id === clickedGroupId &&
                    membersToShow.map((member) => {
                      return (
                        <div
                          onClick={(e) => console.log("E TARGET", e.target)}>
                          {member}
                        </div>);
                    })
                  }
                </div>
              </label>
            </div>
          );
        })
      }
    </div >
  );
};

export default GroupListInVideoRoom;
