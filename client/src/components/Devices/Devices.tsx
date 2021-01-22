import React from 'react';
import styles from './Devices.module.scss';
import {Table, Icon, Switch} from "react-materialize";
import {openAddDeviceModalAction, switchPageAction} from "../../actions/appActions";
import {connect} from "react-redux";

interface Props {
    openAddDeviceModalAction: Function;
}
const Devices: React.FC<Props> = props =>  {
    const {openAddDeviceModalAction} = props
    // Test Data
    const devices = [
        {icon: 'lock', name: 'Lock', location: 'Entrance', since: '18/01/2021', battery: 100, active: true},
        {icon: 'wifi', name: 'WiFi', location: 'Hall', since: '18/01/2021', battery: 40, active: true},
        {icon: 'camera', name: 'Camera', location: 'Living Room', since: '15/01/2021', battery: 0, active: false},
    ];

    return (
        <div className={styles.Devices + " col s12 l9"}>
            <h4>Devices</h4>
            <Icon
                className={styles.add}
                onClick={() => openAddDeviceModalAction()}
            >
                add_circle
            </Icon>
            <div className={styles.wrapper}>
                <Table>
                    <thead>
                    <tr>
                        <th>Device</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Battery</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        devices.map((device, i) => (
                            <tr key={i}>
                                <td>
                                    <Icon className={styles.device}>{device.icon}</Icon>
                                </td>
                                <td>{device.name}</td>
                                <td>{device.location}</td>
                                <td>

                                    <div className="switch">
                                        <label>
                                            <input defaultChecked={device.active} type="checkbox" />
                                            <span className="lever"></span>
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.battery}>
                                        {
                                            (device.battery > 50 && <Icon style={{color: "#05c985"}}>battery_charging_full</Icon>)
                                            ||
                                            (device.battery && device.battery <= 50 && <Icon style={{color: "#ffab4f"}}>battery_alert</Icon>)
                                            ||
                                            <Icon style={{color: "#1f8efa"}}>battery_std</Icon>
                                        }
                                    </span>
                                </td>
                                <td>{device.since}</td>
                                <td>
                                    <Icon>more_vert</Icon>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = dispatch => ({
    openAddDeviceModalAction: () => dispatch(openAddDeviceModalAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Devices);