import React, { useState } from 'react'
import { connect } from 'react-redux'
import { switchPageAction } from '../../actions/appActions'
import home from '../../images/home.png'
import styles from './Sidebar.module.scss'

interface Props {
  currentPage: string
  homeName: string
  homeAddress: string
  switchPageAction: Function
}
const Sidebar: React.FC<Props> = (props) => {
  const { currentPage, switchPageAction, homeName, homeAddress } = props
  const [activeItem, setActiveItem] = useState(currentPage || 'Overview')
  const items = [
    {
      icon: 'home',
      title: 'overview',
    },
    {
      icon: 'devices',
      title: 'devices',
    },
    {
      icon: 'show_chart',
      title: 'analytics',
    },
    {
      icon: 'list',
      title: 'rules',
    },
    {
      icon: 'image',
      title: 'gallery',
    },
    {
      icon: 'history',
      title: 'history',
    },
    {
      icon: 'settings',
      title: 'settings',
    },
  ]

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
        {items.map((item, i) => (
          <li
            className={styles.item + ` ${item.title === activeItem && styles.active}`}
            key={i}
            onClick={() => {
              switchPageAction(item.title.toLowerCase())
              setActiveItem(item.title)
            }}
          >
            <i className="material-icons">{item.icon}</i>
            <span className={styles.title}>{item.title}</span>
          </li>
        ))}
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
  switchPageAction: (page) => dispatch(switchPageAction(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
