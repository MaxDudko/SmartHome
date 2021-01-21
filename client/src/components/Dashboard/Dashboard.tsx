import React, {useState} from 'react';
import styles from './Dashboard.module.scss';
import Navbar from "../TopNavbar/TopNavbar";
import Sidebar from "../Sidebar/Sidebar";
import DevicesSidebar from "../DevicesSidebar/DevicesSidebar";
import {Container} from "react-materialize";
import {connect} from "react-redux";
import Overview from "../Overview/Overview";
import Devices from "../Devices/Devices";
import AddDevice from "../AddDevice/AddDevice";

interface Props {
    currentPage: string;
    addDeviceModalOpen: boolean;
}
const Dashboard: React.FC<Props> = props =>  {
    const { currentPage, addDeviceModalOpen } = props;

    const router = {
        overview: <Overview/>,
        devices: <Devices/>
    }
    return (
        <div className={styles.Dashboard}>
            <Navbar />
            <div className="row">
                <Sidebar />
                {
                    router[currentPage] || <div>{currentPage}</div>
                }
            </div>
            <DevicesSidebar />
            {
                addDeviceModalOpen && <AddDevice />
            }
        </div>
    );
}

const mapStateToProps = state => ({
    currentPage: state.app.currentPage,
    addDeviceModalOpen: state.app.addDeviceModalOpen,
})

export default connect(mapStateToProps, null)(Dashboard);