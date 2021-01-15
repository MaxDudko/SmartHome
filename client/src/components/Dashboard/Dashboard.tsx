import React from 'react';
import styles from './Dashboard.module.scss';
import Navbar from "../TopNavbar/TopNavbar";
import Sidebar from "../Sidebar/Sidebar";
import DevicesSidebar from "../DevicesSidebar/DevicesSidebar";
import {Container} from "react-materialize";

interface Props {

}
const Dashboard: React.FC = props =>  {
    return (
        <div className={styles.Dashboard}>
            <Navbar />
            <div className="row">
                <Sidebar />
            </div>
            <DevicesSidebar />
        </div>
    );
}

export default Dashboard;
