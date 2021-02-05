import React, {useState} from 'react';
import {connect} from "react-redux";
import {loginUserAction, registerUserAction} from "../../actions/userActions";
import styles from './Authentication.module.scss';
import smartHomeLogo from '../../images/smart-home-logo.png';
import logo from '../../images/logo.png';
import {TextInput, Button} from "react-materialize";

interface Props {
    registerUserAction: Function;
    loginUserAction: Function;
}

interface formData {
    email: string;
    password: string;
    confirmPassword?: string;
    fullName?: string;
}

const Authentication: React.FC<Props> = props =>  {
    const { registerUserAction, loginUserAction } = props;

    const [form, setForm] = useState('login');
    const [data, setData] = useState<any>({});
    const [errors, throwErrors] = useState<string[]>([]);

    const handleChange = event => {
        setData({
            ...data,
            [event.target.id]: event.target.value
        })
    }

    const validateData = data => {
        const {email, password, confirmPassword} = data;

        if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            throwErrors([...errors, 'Email is not valid']);
            return false;
        }

        if (!password.match(/^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z0-9\d]{8,}$/)) {
            throwErrors([...errors, 'Password is not valid']);
            return false;
        }

        if (form === "register" && password !== confirmPassword) {
            throwErrors([...errors, 'Passwords are not identical']);
            return false;
        }

       return true;
    }

    const handleSubmit = event => {
        event.preventDefault();
        let isValid = validateData(data);

        if (isValid && form === 'login') return loginUserAction(data);
        if (isValid && form === 'register') return registerUserAction(data);
    }

    const LoginForm = (
        <form className={styles.form + " col s10 m8"} style={{marginLeft: 0}} onSubmit={handleSubmit}>
            <p className={styles.title}>Sign in</p>
            <TextInput
                email
                id="email"
                onChange={handleChange}
                s={12}
                inputClassName="validate"
                required
                label="Email"
                placeholder=""
            />
            <TextInput
                password
                id="password"
                onChange={handleChange}
                s={12}
                inputClassName="validate"
                required
                label="Password"
                placeholder=""
            />
            {errors.length > 0 && errors.map((e, i) => (
                <span style={{color: "red", fontSize: '12px'}} key={i}>{e}</span>
            ))}
            <Button
                node="button"
                type="submit"
                className="waves-effect btn col s12"
                style={{backgroundColor: '#1f8efa', marginLeft: '20px'}}
            >
                SIGN IN
            </Button>
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
        <form className={styles.form +" col s10 m8"} style={{marginLeft: 0}} onSubmit={handleSubmit}>
            <p className={styles.title}>Sign up</p>
            <TextInput
                email
                id="email"
                onChange={handleChange}
                s={12}
                inputClassName="validate"
                required
                label="Email"
                placeholder=""
            />
            <TextInput
                password
                id="password"
                onChange={handleChange}
                s={12}
                inputClassName="validate"
                required
                label="Password"
                placeholder=""
            />
            <TextInput
                password
                id="confirmPassword"
                onChange={handleChange}
                s={12}
                inputClassName="validate"
                required
                label="Confirm Password"
                placeholder=""
            />
            <TextInput
                id="fullName"
                onChange={handleChange}
                s={12}
                inputClassName="validate"
                required
                label="Full Name"
                placeholder=""
            />
            {errors.length > 0 && errors.map((e, i) => (
                <span style={{color: "red", fontSize: '12px'}} key={i}>{e}</span>
            ))}
            <Button
                node="button"
                type="submit"
                className="waves-effect btn col s12"
                style={{backgroundColor: '#1f8efa', marginLeft: '20px'}}
            >
                SIGN UP
            </Button>
            <div className={styles.links}>
                <span className={styles.link + " col s12"} style={{ marginLeft: 'auto', marginRight: 'auto'}}>
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
        <form className={styles.form + " col s10 m8"} style={{marginLeft: 0}} onSubmit={handleSubmit}>
            <p className={styles.title}>Forgot Password</p>
            <div className={styles.restoreText}>
                <p>Place your email in the field below.</p>
                <p>We will send you a link with the</p>
                <p>instructions to follow.</p>
            </div>
            <TextInput
                email
                id="email"
                onChange={handleChange}
                s={12}
                inputClassName="validate"
                required
                label="Email"
                placeholder=""
            />
            <Button
                node="button"
                type="submit"
                className="waves-effect btn col s12"
                style={{backgroundColor: '#1f8efa', marginLeft: '20px'}}
            >
                RECOVER PASSWORD
            </Button>
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
                    <a href="#">
                        <i className={styles.icon + " material-icons"}>play_circle_filled</i>
                    </a>
                    <a href="#">See how it works</a>
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