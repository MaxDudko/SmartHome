import React from 'react'
import { connect } from 'react-redux'
import styles from '../Analytics/Analytics.module.scss'
import EnergyConsumption from './EnergyConsumption'

interface Props {}

const Analytics: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.Analytics} col s12 l10`}>
      <h4>Analytics</h4>
      <EnergyConsumption />
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Analytics)
