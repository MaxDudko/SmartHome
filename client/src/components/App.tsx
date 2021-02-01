import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {tokenValidationAction} from "../actions/userActions";
import styles from './App.module.scss';
import Authentication from "./Authentication/Authentication";
import Dashboard from "./Dashboard/Dashboard";
import {saveDevicesAction} from "../actions/devicesActions";

interface Props {
  homeId: string;
  tokenValidationAction: Function;
  saveDevicesAction: Function;
}

const App: React.FC<Props> = props =>  {
  const { tokenValidationAction, homeId, saveDevicesAction } = props;

  useEffect(() => {
    if (!homeId) return;
    let eventSource = new EventSource(`http://localhost:4000/stream?homeId=${homeId}`)
    eventSource.onopen = function() {
      console.log('connection to stream has been opened');
    };
    eventSource.onerror = function (error) {
      console.log('An error has occurred while receiving stream', error);
    };
    eventSource.onmessage = function (stream) {
      console.log('received stream', JSON.parse(stream.data));
      saveDevicesAction(JSON.parse(stream.data));
    };
  }, [homeId])

  useEffect(() => {
    const token = localStorage.getItem('token');
    tokenValidationAction(token);
  }, [])

  return (
    <div className={styles.App}>
      {
        window.localStorage.getItem('token') ?
            // @ts-ignore
            <Dashboard />
            :
            <Authentication/>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  homeId: state.home.id,
})

const mapDispatchToProps = dispatch => ({
  tokenValidationAction: token => dispatch(tokenValidationAction(token)),
  saveDevicesAction: data => dispatch(saveDevicesAction(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
