import React, {useEffect, useState} from 'react';
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
import {createHomeAction, getHomeListAction, joinHomeAction, selectHomeAction} from "../../actions/homeActions";

interface Props {
    currentPage: string;
    addDeviceModalOpen: boolean;
    homeId: string;
    userId: string;
    selectHomeAction: Function;
}
const Dashboard: React.FC<Props> = props =>  {
    const { currentPage, addDeviceModalOpen, homeId, userId, selectHomeAction } = props;

    useEffect(() => {
        const homeId = localStorage.getItem('homeId');
        if (userId && homeId) {
            selectHomeAction(userId, homeId);
        }
    }, [])
    const router = {
        overview: <Overview/>,
        devices: <Devices/>
    }
    return (
        <div className={styles.Dashboard}>
            <Navbar />
            {
                localStorage.getItem('homeId') ?
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
    userId: state.user.id,
})

const mapDispatchToProps = dispatch => ({
    selectHomeAction: (userId, homeId) => dispatch(selectHomeAction(userId, homeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);