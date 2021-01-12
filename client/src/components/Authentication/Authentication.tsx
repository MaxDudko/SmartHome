import React, {useState} from 'react';
import styles from './Authentication.module.scss';
import logo from '../../images/smart-home-logo.png';
import logo2 from '../../images/logo.png';
// import {Row} from "react-materialize/lib/types/components";
// import { Modal, Button } from 'react-materialize';


const Authentication: React.FC = props =>  {
    const [form, setForm] = useState('login');

    const LoginForm = (
        <div className={styles.form + " row"}>
            <p className={styles.title}>Sign in</p>
            <div className="input-field col s8" style={{marginLeft: 0}}>
                <input placeholder="Email" id="email" type="text" className="validate" />
                <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s8" style={{marginLeft: 0}}>
                <input placeholder="------------" id="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
            </div>
            <div className="input-field col s8" style={{marginLeft: 0, padding: '0 0 0 10px'}}>
                <a className="waves-effect btn col s12" style={{backgroundColor: '#1f8efa'}}>SIGN IN</a>
            </div>
            <div className={styles.links}>
                <span className={styles.link} onClick={() => setForm('restore')}>Forgot your password?</span>
                <span className={styles.link} onClick={() => setForm('register')}>Don't have an account? <span>Sign up</span></span>
            </div>
        </div>
    );

    const RegisterForm = (
        <div className={styles.form + " row"}>
            <p className={styles.title}>Sign up</p>
            <div className="input-field col s8" style={{marginLeft: 0}}>
                <input placeholder="Email" id="email" type="text" className="validate" />
                <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s8" style={{marginLeft: 0}}>
                <input placeholder="------------" id="confirmPassword" type="password" className="validate" />
                <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <div className="input-field col s8" style={{marginLeft: 0}}>
                <input placeholder="Full Name" id="fullName" type="text" className="validate" />
                <label htmlFor="fullName">Full Name</label>
            </div>
            <div className="input-field col s8" style={{marginLeft: 0, padding: '0 0 0 10px'}}>
                <a className="waves-effect btn col s12" style={{backgroundColor: '#1f8efa'}}>SIGN UP</a>
            </div>
            <div className={styles.links}>
                <span className={styles.link}>
                    By clicking Join now, you agree to the LinkedIn User Agreement, Privacy Policy. and Cookie Policy.
                </span>
                <span className={styles.link} onClick={() => setForm('login')}>Already have an account? <span>Login</span></span>
            </div>
        </div>
    );

    const RestoreForm = (
        <div className={styles.form + " row"}>
            <p className={styles.title}>Forgot Password</p>
            <div className={styles.restoreText}>
                <p>Place your email in the field below.</p>
                <p>We will send you a link with the</p>
                <p>instructions to follow.</p>
            </div>
            <div className="input-field col s8" style={{marginLeft: 0}}>
                <input placeholder="Email" id="email" type="text" className="validate" />
                <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s8" style={{marginLeft: 0, padding: '0 0 0 10px'}}>
                <a className="waves-effect btn col s12" style={{backgroundColor: '#1f8efa'}}>RECOVER PASSWORD</a>
            </div>
        </div>
    );

    return (
        <div className={styles.Authentication + " row"}>
            <div className={styles.welcomeScreen + " col hide-on-small-only m7"}>
                <div className={styles.header}>
                    <img src={logo} alt="SmartHome"/>
                </div>
                <div className={styles.slide}>
                    <p>Control your home</p>
                    <p>Connect your life</p>
                </div>
                <div className={styles.footer}>
                    <i className={styles.icon + " material-icons"}>play_circle_filled</i>
                    <span>See how it works</span>
                </div>
            </div>
            <div className={styles.authForm + " col s12 m5"}>
                <div className={styles.header}>
                    <img src={logo2} alt="SmartHome"/>
                </div>
                {
                    (form === 'login' && LoginForm)
                    ||
                    (form === 'register' && RegisterForm)
                    ||
                    (form === 'restore' && RestoreForm)
                }
            </div>
        </div>
    );
}

export default Authentication;