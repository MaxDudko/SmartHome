import React, {useState} from 'react';
import styles from './Sidebar.module.scss';
import home from '../../images/home.png';
import {tokenValidationAction} from "../../actions/userAuth";
import {connect} from "react-redux";
import {switchPageAction} from "../../actions/appInterface";

interface Props {
    currentPage: string;
    switchPageAction: Function;
}
const Sidebar: React.FC<Props> = props =>  {
    const { currentPage, switchPageAction } = props;
    const [activeItem, setActiveItem] = useState(currentPage || 'Overview');
    const items = [
        {
            icon: 'home',
            title: 'Overview'
        },
        {
            icon: 'devices',
            title: 'Devices'
        },
        {
            icon: 'show_chart',
            title: 'Analytics'
        },
        {
            icon: 'list',
            title: 'Rules'
        },
        {
            icon: 'image',
            title: 'Gallery'
        },
        {
            icon: 'history',
            title: 'History'
        },
        {
            icon: 'settings',
            title: 'Settings'
        },
    ];

    return (
        <div className={styles.Sidebar + " col s12 l2"}>
            <div className={styles.head}>
                <img src={home} alt="Home"/>
                <div>
                    <p className={styles.name}>My Home</p>
                    <p className={styles.address}>9898 Trent Bypass Suite 541</p>
                </div>
            </div>
            <ul className={styles.menu}>
                {
                    items.map((item, i) => (
                        <li
                            className={styles.item + ` ${item.title === currentPage && styles.active}` }
                            key={i}
                            onClick={() => switchPageAction(item.title.toLowerCase())}
                        >
                            <i className="material-icons">{item.icon}</i>
                            <span className={styles.title}>{item.title}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

const mapStateToProps = state => ({
    currentPage: state.interfaceReducer.currentPage,
})
const mapDispatchToProps = dispatch => ({
    switchPageAction: page => dispatch(switchPageAction(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
