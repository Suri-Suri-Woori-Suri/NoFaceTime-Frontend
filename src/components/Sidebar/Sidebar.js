import React from 'react';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className={styles.SideContainer}>
      <div className={styles.MenuBox}>
        <Link className={styles.Menu} to="/rooms">Room</Link>
        <Link className={styles.Menu} to="/groups">Group</Link>
      </div>
    </div>
  );
};

export default Sidebar;