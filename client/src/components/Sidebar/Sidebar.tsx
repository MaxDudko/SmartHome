import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import home from '../../images/home.png'
import styles from './Sidebar.module.scss'

interface Props {
  homeName: string
  homeAddress: string
}

const Sidebar: React.FC<Props> = (props) => {
  const { homeName, homeAddress } = props
  const location = useLocation()

  return (
    <div className={styles.Sidebar + ' col l2'}>
      {!(
        location.pathname === '/select-home' ||
        location.pathname === '/create-home' ||
        location.pathname === '/join-home'
      ) && (
        <div className={styles.head}>
          <img src={home} alt="HomeController" />
          <div>
            <p className={styles.name} title={homeName}>
              {homeName}
            </p>
            <p className={styles.address} title={homeAddress}>
              {homeAddress}
            </p>
          </div>
        </div>
      )}
      <ul className={styles.menu}>
        {location.pathname === '/select-home' ||
        location.pathname === '/create-home' ||
        location.pathname === '/join-home' ? (
          <>
            <li
              className={styles.item + ` ${location.pathname === '/select-home' && styles.active}`}
            >
              <NavLink to="/select-home">
                <span className={styles.title}>Select Home</span>
              </NavLink>
            </li>
            <li
              className={styles.item + ` ${location.pathname === '/create-home' && styles.active}`}
            >
              <NavLink to="/create-home">
                <span className={styles.title}>Create Home</span>
              </NavLink>
            </li>
            <li className={styles.item + ` ${location.pathname === '/join-home' && styles.active}`}>
              <NavLink to="/join-home">
                <span className={styles.title}>Join Home</span>
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className={styles.item + ` ${location.pathname === '/overview' && styles.active}`}>
              <NavLink to="/overview">
                <i className="material-icons">home</i>
                <span className={styles.title}>overview</span>
              </NavLink>
            </li>
            <li className={styles.item + ` ${location.pathname === '/devices' && styles.active}`}>
              <NavLink to="/devices">
                <i className="material-icons">devices</i>
                <span className={styles.title}>devices</span>
              </NavLink>
            </li>
            <li className={styles.item + ` ${location.pathname === '/analytics' && styles.active}`}>
              <NavLink to="/analytics">
                <i className="material-icons">show_chart</i>
                <span className={styles.title}>analytics</span>
              </NavLink>
            </li>
            <li className={styles.item + ` ${location.pathname === '/rules' && styles.active}`}>
              <NavLink to="/rules">
                <i className="material-icons">list</i>
                <span className={styles.title}>rules</span>
              </NavLink>
            </li>
            <li className={styles.item + ` ${location.pathname === '/gallery' && styles.active}`}>
              <NavLink to="/gallery">
                <i className="material-icons">image</i>
                <span className={styles.title}>gallery</span>
              </NavLink>
            </li>
            <li className={styles.item + ` ${location.pathname === '/history' && styles.active}`}>
              <NavLink to="/history">
                <i className="material-icons">history</i>
                <span className={styles.title}>history</span>
              </NavLink>
            </li>
            <li className={styles.item + ` ${location.pathname === '/settings' && styles.active}`}>
              <NavLink to="/settings">
                <i className="material-icons">settings</i>
                <span className={styles.title}>settings</span>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  homeName: state.home.name,
  homeAddress: state.home.address,
})
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
