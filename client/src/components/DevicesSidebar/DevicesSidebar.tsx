import React, {useState} from 'react';
import styles from './DevicesSidebar.module.scss';
import {openAddDeviceModalAction} from "../../actions/appActions";
import {connect} from "react-redux";
import {lockToggleAction} from "../../actions/devicesActions";

interface Props {
    homeId: string;
    devices: {};
    openAddDeviceModalAction: Function;
    lockToggleAction: Function;
}
const DevicesSidebar: React.FC<Props> = props =>  {
    const {homeId, devices, openAddDeviceModalAction, lockToggleAction} = props;

    return (
        <div className={styles.DevicesSidebar}>
            <div className={styles.add + " col s1"}>
                <i className="material-icons right"
                   onClick={() => openAddDeviceModalAction()}
                >
                    add_circle
                </i>
            </div>
            <div className={styles.container}>
                {
                    Object.entries(devices).map((deviceType: any, i) => (
                        deviceType[1].map((device: any,  i) => (
                            <div className={styles.device} key={i}>
                                <div className={styles.image}>
                                    <i className="material-icons">{device.type}</i>
                                </div>
                                <div className={styles.info}>
                                    <p>{device.type.charAt(0).toUpperCase() + device.type.slice(1)}</p>
                                    <p>Active since</p>
                                    <p>{device.updatedAt.toLocaleString()}</p>
                                </div>
                                <div className={styles.controller}>
                                    <div className="switch">
                                        <label>
                                            <input type="checkbox"
                                                   checked={device.value}
                                                   onChange={() => lockToggleAction(homeId.toString())}
                                            />
                                            <span className="lever"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )
                    )))
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    homeId: state.home.id,
    devices: state.devices,
})
const mapDispatchToProps = dispatch => ({
    openAddDeviceModalAction: () => dispatch(openAddDeviceModalAction()),
    lockToggleAction: (homeId) => dispatch(lockToggleAction(homeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DevicesSidebar);
