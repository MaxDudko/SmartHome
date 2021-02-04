import React from 'react';
import styles from './TopNavbar.module.scss';
import smartHomeLogo from '../../images/smartHomeLogo.png';
import {Navbar, NavItem, Dropdown, Icon, Divider} from "react-materialize";
import {logoutUserAction} from "../../actions/userActions";
import {connect} from "react-redux";
import {selectAnotherHomeAction} from "../../actions/homeActions";

interface Props {
    logoutUserAction: Function;
    selectAnotherHomeAction: Function;
}
const TopNavbar: React.FC<Props> = props =>  {
    const {logoutUserAction, selectAnotherHomeAction} = props;
    return (
        <Navbar
            className={styles.TopNavbar}
            alignLinks="right"
            brand={
                <a href="#" className={styles.logo + " brand-logo"}>
                    <img src={smartHomeLogo} alt="SmartHome"/>
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
                preventScrolling: true
            }}
        >
            <NavItem href="">
                <i className="material-icons left">toc</i>
                <div className={styles.box + " progress"} style={{background: '#20293c'}}>
                    <div className="determinate"
                         style={{width: '70%', background: '#1f8efa'}}
                    />
                </div>
            </NavItem>
            <NavItem href="">
                <i className="material-icons right">help</i>
            </NavItem>
            <NavItem href="">
                <i className="material-icons right">email</i>
            </NavItem>
            <NavItem href="">
                <i className="material-icons right">notifications</i>
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
                    outDuration: 250
                }}
                trigger={<a href="#">Username{' '}<Icon right>arrow_drop_down</Icon></a>}
            >
                <a href="#" onClick={() => selectAnotherHomeAction()}>
                    Switch Home
                </a>
                <Divider />
                <a href="#" onClick={() => logoutUserAction()}>
                    Logout
                    <Icon right>exit_to_app</Icon>
                </a>
            </Dropdown>
        </Navbar>
    );
}

const mapDispatchToProps = dispatch => ({
    logoutUserAction: () => dispatch(logoutUserAction()),
    selectAnotherHomeAction: () => dispatch(selectAnotherHomeAction()),
})

export default connect(null, mapDispatchToProps)(TopNavbar);
