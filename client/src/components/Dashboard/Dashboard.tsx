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
import AddHome from "../AddHome/AddHome";

interface Props {
    currentPage: string;
    addDeviceModalOpen: boolean;
    homeId: string;
}
const Dashboard: React.FC<Props> = props =>  {
    const { currentPage, addDeviceModalOpen, homeId } = props;

    const router = {
        overview: <Overview/>,
        devices: <Devices/>
    }
    return (
        <div className={styles.Dashboard}>
            <Navbar />
            {
                homeId ?
                    <>
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
                    </>
                    :
                    <AddHome />
            }
        </div>
    );
}

const mapStateToProps = state => ({
    currentPage: state.app.currentPage,
    addDeviceModalOpen: state.app.addDeviceModalOpen,
    homeId: state.home.id,
})

export default connect(mapStateToProps, null)(Dashboard);