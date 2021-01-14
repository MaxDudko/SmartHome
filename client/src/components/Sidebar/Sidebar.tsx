import React, {useState} from 'react';
import styles from './Sidebar.module.scss';
import home from '../../images/home.png';

interface Props {

}
const Sidebar: React.FC = props =>  {
    const [activeItem, setActiveItem] = useState('Overview');
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
            icon: 'image',
            title: 'History'
        },
        {
            icon: 'settings',
            title: 'Settings'
        },
    ];

    return (
        <div className={styles.Sidebar + " col s2"}>
            <div className={styles.head}>
                <img src={home} alt="Home"/>
                <p className={styles.name}>My Home</p>
                <p className={styles.address}>9898 Trent Bypass Suite 541</p>
            </div>
            <ul className={styles.menu}>
                {
                    items.map((item, i) => (
                        <li
                            className={styles.item + ` ${item.title === activeItem && styles.active}` }
                            key={i}
                            onClick={() => setActiveItem(item.title)}
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

export default Sidebar;
