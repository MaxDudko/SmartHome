import React from 'react'
import { Icon } from 'react-materialize'
import { connect } from 'react-redux'
import data from '../../testData'
import styles from '../Analytics/Analytics.module.scss'
import Device, { DeviceProps } from './Device'
import EnergyConsumption from './EnergyConsumption'

interface Props {}

const Analytics: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.Analytics} col s12 l10`}>
      <h4>
        Analytics
        <Icon className={styles.settings}>settings</Icon>
      </h4>
      <EnergyConsumption />
      <div className={`${styles.devicesRow}`}>
        {data.devices.map((device: DeviceProps, index: number) => (
          <Device
            key={index}
            name={device.name}
            value={device.value}
            time={device.time}
            energy={device.energy}
            difference={device.difference}
            icon={device.icon}
          />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Analytics)
