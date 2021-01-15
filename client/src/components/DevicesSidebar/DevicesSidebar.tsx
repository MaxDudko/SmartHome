import React, {useState} from 'react';
import styles from './DevicesSidebar.module.scss';

interface Props {

}
const DevicesSidebar: React.FC = props =>  {

    // Test Data
    const devices = [
        {icon: 'lock', name: 'Lock', since: 'January 18, 2021', disabled: false},
        {icon: 'wifi', name: 'WiFi', since: 'January 18, 2021', disabled: false},
        {icon: 'camera', name: 'Camera', since: 'January 15, 2021', disabled: true}
    ];

    return (
        <div className={styles.DevicesSidebar}>
            <div className={styles.add + " col s1"}>
                <i className="material-icons right">add_circle</i>
            </div>
            <div className={styles.container}>
                {
                    devices.map((device, i) => (
                        <div className={styles.device} key={i}>
                            <div className={styles.image}>
                                <i className="material-icons">{device.icon}</i>
                            </div>
                            <div className={styles.info}>
                                <p>{device.name}</p>
                                <p>Active since</p>
                                <p>{device.since}</p>
                            </div>
                            <div className={styles.controller}>
                                {/*<Switch*/}
                                {/*    id="Switch-11"*/}
                                {/*    offLabel="Off"*/}
                                {/*    onChange={function noRefCheck(){}}*/}
                                {/*    onLabel="On"*/}
                                {/*/>*/}
                                <div className="switch">
                                    <label>
                                        <input disabled={device.disabled} type="checkbox" />
                                        <span className="lever"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default DevicesSidebar;
