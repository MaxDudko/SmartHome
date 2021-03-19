import React from 'react'
import { Divider, Dropdown, Icon, Navbar, NavItem } from 'react-materialize'
import { connect } from 'react-redux'
import { selectAnotherHomeAction } from '../../actions/homeActions'
import { logoutUserAction } from '../../actions/userActions'
import smartHomeLogo from '../../images/smartHomeLogo.png'
import Sidebar from '../Sidebar/Sidebar'
import styles from './TopNavbar.module.scss'

interface Props {
  fullName: string
  logoutUserAction: Function
  selectAnotherHomeAction: Function
}

const TopNavbar: React.FC<Props> = (props) => {
  const { logoutUserAction, selectAnotherHomeAction, fullName } = props

  const switchHome = () => {
    selectAnotherHomeAction()
  }
  const logout = () => {
    logoutUserAction()
  }
  return (
    <Navbar
      className={styles.TopNavbar}
      alignLinks="right"
      brand={
        <a href="#" className={styles.logo + ' brand-logo'}>
          <img src={smartHomeLogo} alt="SmartHome" />
        </a>
      }
      id="mobile-nav"
      menuIcon={<Icon>menu</Icon>}
      options={{
        draggable: true,
        edge: 'left',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        outDuration: 200,
        preventScrolling: true,
      }}
    >
      <div className="hide-on-large-only">
        <Sidebar />
      </div>
      <div className="navItems">
        <NavItem href="">
          <i className="material-icons left">toc</i>
          <div
            className={styles.box + ' progress hide-on-med-and-down'}
            style={{ background: '#20293c', margin: '0 12px 0 0' }}
          >
            <div className="determinate" style={{ width: '70%', background: '#1f8efa' }} />
          </div>
        </NavItem>
        <NavItem href="">
          <i className="material-icons">help</i>
        </NavItem>
        <NavItem href="">
          <i className="material-icons">email</i>
        </NavItem>
        <NavItem href="">
          <i className="material-icons">notifications</i>
        </NavItem>
        <Dropdown
          id="Dropdown_6"
          options={{
            alignment: 'left',
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            container: null,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250,
          }}
          trigger={
            <a
              href="#"
              className="hide-on-med-and-down"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <span className={styles.username} title={fullName}>
                {fullName}
              </span>
              <Icon right={true}>arrow_drop_down</Icon>
            </a>
          }
        >
          <a href="#" onClick={switchHome}>
            Switch Home
          </a>
          <Divider />
          <a href="#" onClick={logout}>
            Logout
            <Icon right={true}>exit_to_app</Icon>
          </a>
        </Dropdown>
        <div className="mob-items hide-on-large-only">
          <NavItem href="#" onClick={switchHome}>
            Switch Home
          </NavItem>
          <Divider />
          <NavItem href="#" onClick={logout}>
            Logout
            <Icon right={true}>exit_to_app</Icon>
          </NavItem>
        </div>
      </div>
    </Navbar>
  )
}

const mapStateToProps = (state) => ({
  fullName: state.user.fullName,
})

const mapDispatchToProps = (dispatch) => ({
  logoutUserAction: () => dispatch(logoutUserAction()),
  selectAnotherHomeAction: () => dispatch(selectAnotherHomeAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar)
