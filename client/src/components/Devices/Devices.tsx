import React, {useEffect, useState} from 'react';
import styles from './Devices.module.scss';
import {Table, Icon, Switch} from "react-materialize";
import {openAddDeviceModalAction, switchPageAction} from "../../actions/appActions";
import {connect} from "react-redux";
import {lockToggleAction} from "../../actions/devicesActions";

interface Props {
    homeId: string;
    devices: any;
    openAddDeviceModalAction: Function;
    lockToggleAction: Function;
}
const Devices: React.FC<Props> = props =>  {
    const {homeId, openAddDeviceModalAction, devices, lockToggleAction} = props;
    const [list, setList] = useState<any>([]);

    useEffect(() => {
        const list: any = [];
        Object.entries(devices).map((deviceType: any, i) => {
            deviceType[1].map((device,  i) => {
                console.log(device)
                list.push(device)
            })
        })
        setList(list);
    }, [devices])

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
                        Object.entries(devices).map((deviceType: any, i) => (
                            deviceType[1].map((device: any,  i) => (
                            <tr key={i}>
                                <td>
                                    <Icon className={styles.device}>{device.type}</Icon>
                                </td>
                                <td>{device.type.charAt(0).toUpperCase() + device.type.slice(1)}</td>
                                <td>{device.location}</td>
                                <td>

                                    <div className="switch">
                                        <label>
                                            <input type="checkbox"
                                                   checked={device.value}
                                                   onChange={() => lockToggleAction(homeId.toString())}
                                            />
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
                                <td>{device.updatedAt.toLocaleString()}</td>
                                <td>
                                    <Icon>more_vert</Icon>
                                </td>
                            </tr>
                        ))))
                    }
                    </tbody>
                </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Devices);