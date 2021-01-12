import React, {useEffect} from 'react';
import styles from './App.module.scss';
import Authentication from "./Authentication/Authentication";
import Dashboard from "./Dashboard/Dashboard";
import axios from "axios";

const App: React.FC = props =>  {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const API = 'http://localhost:4000/';
    if (token) {
      axios.post(`${API}check`, {
        token: token
      }).then((data) => {
        console.log(data)
      }).catch(() => {
        window.localStorage.clear();
      });
    }
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

export default App;
