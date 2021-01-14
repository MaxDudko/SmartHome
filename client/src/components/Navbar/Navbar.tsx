import React from 'react';
import styles from './Navbar.module.scss';
import smartHomeLogo from '../../images/smartHomeLogo.png';

interface Props {

}
const Navbar: React.FC = props =>  {
    return (
        <div className={styles.Navbar}>
            <nav className={styles.Navbar + " nav-extended"}>
                <div className="nav-wrapper">
                    <a href="#" className={styles.logo + " brand-logo"}>
                        <img src={smartHomeLogo} alt="SmartHome"/>
                    </a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i
                        className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li className={styles.progress}>
                            <a href="">
                                <i className="material-icons right">toc</i>
                            </a>
                            <div className={styles.box + " progress"} style={{background: '#20293c'}}>
                                <div className="determinate"
                                     style={{width: '70%', background: '#1f8efa'}}
                                />
                            </div>
                        </li>
                        <li>
                            <a href="">
                                <i className="material-icons right">help</i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i className="material-icons right">email</i>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i className="material-icons right">notifications</i>
                            </a>
                        </li>
                        <li>
                            <a data-target="dropdown1">
                                Username
                                <i className="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
