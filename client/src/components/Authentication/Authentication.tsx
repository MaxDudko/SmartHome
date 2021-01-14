import React, {useState} from 'react';
import {connect} from "react-redux";
import {loginUserAction, registerUserAction} from "../../actions/userAuth";
import styles from './Authentication.module.scss';
import smartHomeLogo from '../../images/smart-home-logo.png';
import logo from '../../images/logo.png';

interface Props {
    registerUserAction: Function;
    loginUserAction: Function;
}

const Authentication: React.FC<Props> = props =>  {
    const { registerUserAction, loginUserAction } = props;

    const [form, setForm] = useState('login');
    const [data, setData] = useState({});
    const [passwordValid, validatePassword] = useState(true);

    const handleChange = event => {
        setData({
            ...data,
            [event.target.id]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()

        if (form === 'login') loginUserAction(data);
        if (form === 'register') {
            // @ts-ignore
            if (data.password !== data.confirmPassword) return validatePassword(false);
            registerUserAction(data)
        }
    }

    const LoginForm = (
        <form className={styles.form + " row"} onSubmit={handleSubmit}>
            <p className={styles.title}>Sign in</p>
            <div className={styles.field + " col s8"} style={{marginLeft: 0}}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    onChange={handleChange}
                    className="validate"
                    required
                    placeholder=""
                />
            </div>
            <div className={styles.field + " col s8"} style={{marginLeft: 0}}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    onChange={handleChange}
                    className="validate"
                    required
                    placeholder=""
                />
            </div>
            <div className="input-field col s8" style={{marginLeft: 0, padding: '0 0 0 10px'}}>
                <button
                    type="submit"
                    className="waves-effect btn col s12"
                    style={{backgroundColor: '#1f8efa'}}
                >
                    SIGN IN
                </button>
            </div>
            <div className={styles.links}>
                <span
                    className={styles.link}
                    onClick={() => setForm('restore')}
                >
                    Forgot your password?
                </span>
                <span
                    className={styles.link}
                    onClick={() => setForm('register')}
                >
                    Don't have an account?
                    <span>Sign up</span>
                </span>
            </div>
        </form>
    );

    const RegisterForm = (
        <form className={styles.form + " row"} onSubmit={handleSubmit}>
            <p className={styles.title}>Sign up</p>
            <div className={styles.field + " col s8"} style={{marginLeft: 0}}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    onChange={handleChange}
                    className="validate"
                    required
                    placeholder=""
                />
            </div>
            <div className={styles.field + " col s8"} style={{marginLeft: 0}}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    onChange={handleChange}
                    className="validate"
                    required
                    placeholder=""
                />
            </div>
            {
                !passwordValid && <span className="red">Passwords are not identical</span>
            }
            <div className={styles.field + " col s8"} style={{marginLeft: 0}}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    onChange={handleChange}
                    className="validate"
                    required
                    placeholder=""
                />
            </div>
            <div className={styles.field + " col s8"} style={{marginLeft: 0}}>
                <label htmlFor="fullName">Full Name</label>
                <input type="text"
                       id="fullName"
                       onChange={handleChange}
                       className="validate"
                       required
                       placeholder=""
                />
            </div>
            <div className="input-field col s8" style={{marginLeft: 0, padding: '0 0 0 10px'}}>
                <button
                    type="submit"
                    className="waves-effect btn col s12"
                    style={{backgroundColor: '#1f8efa'}}
                >
                    SIGN UP
                </button>
            </div>
            <div className={styles.links}>
                <span className={styles.link + " col s8"} style={{ marginLeft: 'auto', marginRight: 'auto'}}>
                    By clicking Join now, you agree to the LinkedIn User Agreement, Privacy Policy. and Cookie Policy.
                </span>
                <span
                    className={styles.link}
                    onClick={() => setForm('login')}
                >
                    Already have an account?
                    <span>Login</span>
                </span>
            </div>
        </form>
    );

    const RestoreForm = (
        <form className={styles.form + " row"} onSubmit={handleSubmit}>
            <p className={styles.title}>Forgot Password</p>
            <div className={styles.restoreText}>
                <p>Place your email in the field below.</p>
                <p>We will send you a link with the</p>
                <p>instructions to follow.</p>
            </div>
            <div className="input-field col s8" style={{marginLeft: 0}}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    onChange={handleChange}
                    className="validate"
                    required
                    placeholder=""
                />
            </div>
            <div className="input-field col s8" style={{marginLeft: 0, padding: '0 0 0 10px'}}>
                <button
                    type="submit"
                    className="waves-effect btn col s12"
                    style={{backgroundColor: '#1f8efa'}}
                >
                    RECOVER PASSWORD
                </button>
            </div>
        </form>
    );

    return (
        <div className={styles.Authentication + " row"}>
            <div className={styles.welcomeScreen + " col hide-on-small-only m7"}>
                <div className={styles.header}>
                    <img src={smartHomeLogo} alt="SmartHome"/>
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
                    <img src={logo} alt="SmartHome"/>
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

const mapDispatchToProps = dispatch => ({
    registerUserAction: data => dispatch(registerUserAction(data)),
    loginUserAction: data => dispatch(loginUserAction(data))
})

export default connect(null, mapDispatchToProps)(Authentication);