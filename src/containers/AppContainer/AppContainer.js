import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import styles from './AppContainer.module.css';

function AppContainer({
}) {

  return (
    <div className={styles.AppContainer}>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
