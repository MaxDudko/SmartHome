import React from 'react';
import styles from './Dashboard.module.scss';

interface Props {

}
const Dashboard: React.FC = props =>  {
    return (
        <div className={styles.Dashboard}>
            SmartHome Dashboard

            <button onClick={() => {
                localStorage.clear();
                window.location.reload();
            }}>LOGOUT(test)</button>
        </div>
    );
}

export default Dashboard;
