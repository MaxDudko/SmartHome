import React from 'react'
import { Icon } from 'react-materialize'
import { connect } from 'react-redux'
import data from '../../testData'
import styles from '../Analytics/Analytics.module.scss'
import Device, { DeviceProps } from './Device'
import EnergyConsumption from './EnergyConsumption'
import LineChart from './LineChart'

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
      <div className={styles.roomRow}>
        {data.rooms.map((room: any, index: number) => (
          <div className={`${styles.room} col s12 l3`} key={index}>
            <div className={`${styles.description} col s5`}>
              <div className={styles.field}>
                <span className={styles.value}>{room.kwh}</span>
                <div className={styles.label}>
                  <Icon className={styles.icon}>info</Icon>
                  <span>KWH</span>
                </div>
              </div>
              <div className={styles.field}>
                <span>{room.name}</span>
              </div>
            </div>
            <div className={`${styles.chartContainer} col s7`}>
              <LineChart
                width={980}
                height={350}
                data={[room.points]}
                colors={[room.color]}
                lineOnly={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Analytics)
