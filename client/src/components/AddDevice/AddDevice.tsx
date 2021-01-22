import React, {useState} from 'react';
import styles from './AddDevice.module.scss';
import {Icon, Button, Col, TextInput, Modal} from "react-materialize";
import {closeAddDeviceModalAction} from "../../actions/appActions";
import {connect} from "react-redux";

interface Props {
    closeAddDeviceModalAction: Function;
}
const AddDevice: React.FC<Props> = props =>  {
    const {closeAddDeviceModalAction} = props;
    const [currentStep, setStep] = useState(1);
    const [selectedMethod, setSelectedMethod] = useState('')

    const steps = {
        1: (
            <div className={styles.main}>
                <Col
                    s={5}
                    className={`${styles.box} ${selectedMethod === 'discover' ? styles.active : ''}`}
                    onClick={() => setSelectedMethod('discover')}
                >
                    <Icon className={styles.icon}>wifi_tethering</Icon>
                    <p>Discover my device</p>
                </Col>
                <span className={styles.or}>or</span>
                <Col
                    s={5}
                    className={`${styles.box} ${selectedMethod === 'enter' ? styles.active : ''}`}
                    onClick={() => setSelectedMethod('enter')}
                >
                    <Icon className={styles.icon}>keyboard</Icon>
                    <p>Enter MAC address</p>
                </Col>
            </div>
        ),
        2: (
            <div className={styles.main}>
                <Col s={6} className={styles.box}>
                    <Icon className={styles.icon}>keyboard</Icon>
                    <p>Device preview</p>
                </Col>
                <Col s={6} className={styles.form}>
                    <TextInput
                        id="MAC"
                        // onChange={handleChange}
                        s={12}
                        inputClassName="validate"
                        required
                        label="MAC Address"
                        placeholder=""
                    />
                    <TextInput
                        id="location"
                        // onChange={handleChange}
                        s={12}
                        inputClassName="validate"
                        required
                        label="Device Location"
                        placeholder=""
                    />
                    <TextInput
                        id="name"
                        // onChange={handleChange}
                        s={12}
                        inputClassName="validate"
                        required
                        label="Device Name"
                        placeholder=""
                    />
                </Col>
            </div>
        )
    }

    return (
        <div className={styles.AddDevice}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <p className={styles.title}>Add a new device</p>
                    <Icon
                        className={styles.cancel}
                        onClick={() => closeAddDeviceModalAction()}
                    >
                        cancel
                    </Icon>
                </div>
                {
                    steps[currentStep]
                }
                <div className={styles.footer}>
                    <Button
                        className={styles.secondary}
                        onClick={() => closeAddDeviceModalAction()}
                    >
                        Cancel
                    </Button>
                    {
                        currentStep === 1 && (
                            <Button
                                className={styles.primary}
                                onClick={() => setStep(currentStep+1)}
                            >
                                Continue
                            </Button>
                        ) || (
                            <Button
                                className={styles.primary}
                                onClick={null}
                            >
                                Add Device
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    closeAddDeviceModalAction: () => dispatch(closeAddDeviceModalAction()),
})

export default connect(null, mapDispatchToProps)(AddDevice);