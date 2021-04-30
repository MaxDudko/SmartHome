import React from 'react'
import { Col } from 'react-materialize'
import { connect } from 'react-redux'
import smartHomeLogo from '../../images/smart-home-logo.png'
import styles from './Authentication.module.scss'

const WelcomeScreen: React.FC = (props) => {
  return (
    <Col m={7} className={styles.welcomeScreen + ' hide-on-small-only pull-m5'}>
      <div className={styles.header}>
        <img src={smartHomeLogo} alt="SmartHome" />
      </div>
      <div className={styles.slide}>
        <p>Control your home</p>
        <p>Connect your life</p>
      </div>
      <div className={styles.footer}>
        <a href="#root">
          <i className={styles.icon + ' material-icons'}>play_circle_filled</i>
        </a>
        <a href="#root">See how it works</a>
      </div>
    </Col>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
