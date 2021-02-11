import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import home from '../../images/home.png'
import styles from './Sidebar.module.scss'

interface Props {
  currentPage: string
  homeName: string
  homeAddress: string
}
const Sidebar: React.FC<Props> = (props) => {
  const { homeName, homeAddress } = props
  const location = useLocation()

  return (
    <div className={styles.Sidebar + ' col l2'}>
      <div className={styles.head}>
        <img src={home} alt="HomeController" />
        <div>
          <p className={styles.name}>{homeName}</p>
          <p className={styles.address}>{homeAddress}</p>
        </div>
      </div>
      <ul className={styles.menu}>
        <li className={styles.item + ` ${location.pathname === '/overview' && styles.active}`}>
          <Link to="/overview">
            <i className="material-icons">home</i>
            <span className={styles.title}>overview</span>
          </Link>
        </li>
        <li className={styles.item + ` ${location.pathname === '/devices' && styles.active}`}>
          <Link to="/devices">
            <i className="material-icons">devices</i>
            <span className={styles.title}>devices</span>
          </Link>
        </li>
        <li className={styles.item + ` ${location.pathname === '/analytics' && styles.active}`}>
          <Link to="/analytics">
            <i className="material-icons">show_chart</i>
            <span className={styles.title}>analytics</span>
          </Link>
        </li>
        <li className={styles.item + ` ${location.pathname === '/rules' && styles.active}`}>
          <Link to="/rules">
            <i className="material-icons">list</i>
            <span className={styles.title}>rules</span>
          </Link>
        </li>
        <li className={styles.item + ` ${location.pathname === '/gallery' && styles.active}`}>
          <Link to="/gallery">
            <i className="material-icons">image</i>
            <span className={styles.title}>gallery</span>
          </Link>
        </li>
        <li className={styles.item + ` ${location.pathname === '/history' && styles.active}`}>
          <Link to="/history">
            <i className="material-icons">history</i>
            <span className={styles.title}>history</span>
          </Link>
        </li>
        <li className={styles.item + ` ${location.pathname === '/settings' && styles.active}`}>
          <Link to="/settings">
            <i className="material-icons">settings</i>
            <span className={styles.title}>settings</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentPage: state.app.currentPage,
  homeName: state.home.name,
  homeAddress: state.home.address,
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
