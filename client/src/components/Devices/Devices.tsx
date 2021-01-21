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
                                    <Switch
                                        className={styles.controller}
                                        offLabel="Off"
                                        onLabel="On"
                                        onChange={() => null}
                                        checked={device.active}
                                    />
                                </td>
                                <td>
                                    <Icon>
                                        {
                                            (device.battery > 50 && "battery_charging_full")
                                            ||
                                            (device.battery && device.battery <= 50 && "battery_alert")
                                            ||
                                            "battery_std"
                                        }
                                    </Icon>
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