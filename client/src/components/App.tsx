import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {tokenValidationAction} from "../actions/userAuth";
import styles from './App.module.scss';
import Authentication from "./Authentication/Authentication";
import Dashboard from "./Dashboard/Dashboard";

interface Props {
  tokenValidationAction: Function;
}

const App: React.FC<Props> = props =>  {
  const { tokenValidationAction } = props;

  useEffect(() => {
    const token = localStorage.getItem('token');
    tokenValidationAction(token);
  }, [])
  return (
    <div className={styles.App}>
      {
        window.localStorage.getItem('token') ?
            <Dashboard />
            :
            <Authentication/>
      }
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  tokenValidationAction: token => dispatch(tokenValidationAction(token)),
})

export default connect(null, mapDispatchToProps)(App);
