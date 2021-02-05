import React, {useState} from 'react';
import styles from './Sidebar.module.scss';
import home from '../../images/home.png';
import {tokenValidationAction} from "../../actions/userActions";
import {connect} from "react-redux";
import {switchPageAction} from "../../actions/appActions";

interface Props {
    currentPage: string;
    homeName: string;
    homeAddress: string;
    switchPageAction: Function;
}
const Sidebar: React.FC<Props> = props =>  {
    const { currentPage, switchPageAction, homeName, homeAddress } = props;
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
        <div className={styles.Sidebar + " col l2"}>
            <div className={styles.head}>
                <img src={home} alt="HomeController"/>
                <div>
                    <p className={styles.name}>{homeName}</p>
                    <p className={styles.address}>{homeAddress}</p>
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
    currentPage: state.app.currentPage,
    homeName: state.home.name,
    homeAddress: state.home.address,
})
const mapDispatchToProps = dispatch => ({
    switchPageAction: page => dispatch(switchPageAction(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
