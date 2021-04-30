import { DateTime } from 'luxon'
import React from 'react'
import { Icon } from 'react-materialize'
import { connect } from 'react-redux'
import { openDevicesSidebarAction, openModalAction } from '../../actions/appActions'
import { lockToggleAction } from '../../actions/devicesActions'
import styles from './DevicesSidebar.module.scss'

interface Props {
  devicesSidebarOpen: boolean
  homeId: string
  devices: []
  openDevicesSidebarAction: Function
  openModalAction: Function
  lockToggleAction: Function
}

const DevicesSidebar: React.FC<Props> = (props) => {
  const {
    homeId,
    devices,
    devicesSidebarOpen,
    openDevicesSidebarAction,
    openModalAction,
    lockToggleAction,
  } = props

  return (
    <div className={styles.DevicesSidebar + ` ${!devicesSidebarOpen ? styles.collapsed : ''}`}>
      <div className={styles.hidebtn}>
        <span onClick={() => openDevicesSidebarAction()}>
          <Icon>keyboard_arrow_down</Icon>
        </span>
      </div>
      {devicesSidebarOpen && (
        <>
          <div className={styles.add}>
            <i className="material-icons right" onClick={() => openModalAction()}>
              add_circle
            </i>
          </div>
          <div className={styles.container}>
            {devices.map((device: any, i: number) => (
              <div className={styles.device} key={i}>
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
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  devices: state.devices.activeDevices,
  homeId: state.home.id,
  devicesSidebarOpen: state.app.devicesSidebarOpen,
})

const mapDispatchToProps = (dispatch) => ({
  lockToggleAction: (homeId: string) => dispatch(lockToggleAction(homeId)),
  openDevicesSidebarAction: () => dispatch(openDevicesSidebarAction()),
  openModalAction: () => dispatch(openModalAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DevicesSidebar)
