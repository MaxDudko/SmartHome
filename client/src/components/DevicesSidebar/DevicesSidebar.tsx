import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { Icon } from 'react-materialize'
import { connect } from 'react-redux'
import { openAddDeviceModalAction } from '../../actions/appActions'
import { lockToggleAction } from '../../actions/devicesActions'
import styles from './DevicesSidebar.module.scss'

interface Props {
  homeId: string
  devices: {}
  openAddDeviceModalAction: Function
  lockToggleAction: Function
}
const DevicesSidebar: React.FC<Props> = (props) => {
  const { homeId, devices, openAddDeviceModalAction, lockToggleAction } = props
  const [view, setView] = useState(true)

  return (
    <div className={styles.DevicesSidebar + ` ${!view ? styles.collapsed : ''}`}>
      <div className={styles.hidebtn}>
        <span onClick={() => setView(!view)}>
          <Icon>keyboard_arrow_down</Icon>
        </span>
      </div>
      {view && (
        <>
          <div className={styles.add + ' col s1'}>
            <i className="material-icons right" onClick={() => openAddDeviceModalAction()}>
              add_circle
            </i>
          </div>
          <div className={styles.container}>
            {Object.entries(devices).map((deviceType: any, i) =>
              deviceType[1].map((device: any, index: number) => (
                <div className={styles.device} key={index}>
                  <div className={styles.image}>
                    <i className="material-icons">{device.type}</i>
                  </div>
                  <div className={styles.info}>
                    <p>{device.type.charAt(0).toUpperCase() + device.type.slice(1)}</p>
                    <p>Active since</p>
                    <p>{DateTime.fromISO(device.updatedAt).setLocale('en-gb').toLocaleString()}</p>
                  </div>
                  <div className={styles.controller}>
                    <div className="switch">
                      <label>
                        <input
                          type="checkbox"
                          checked={device.value}
                          onChange={() => lockToggleAction(homeId.toString())}
                        />
                        <span className="lever" />
                      </label>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  devices: state.devices,
  homeId: state.home.id,
})
const mapDispatchToProps = (dispatch) => ({
  lockToggleAction: (homeId) => dispatch(lockToggleAction(homeId)),
  openAddDeviceModalAction: () => dispatch(openAddDeviceModalAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DevicesSidebar)
