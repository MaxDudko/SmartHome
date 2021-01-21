import React, {useState} from 'react';
import styles from './AddDevice.module.scss';
import {Icon, Button, Col, TextInput} from "react-materialize";
import l from '../../images/l.png';
import r from '../../images/r.png';
import {closeAddDeviceModalAction} from "../../actions/appActions";
import {connect} from "react-redux";

interface Props {
    closeAddDeviceModalAction: Function;
}
const AddDevice: React.FC<Props> = props =>  {
    const {closeAddDeviceModalAction} = props;
    const [currentStep, setStep] = useState(1);

    const steps = {
        1: (
            <div className={styles.main}>
                <Col s={5} className={styles.box}>
                    <img src={l} alt="."/>
                </Col>
                <span className={styles.or}>or</span>
                <Col s={5} className={styles.box}>
                    <img src={r} alt="."/>
                </Col>
            </div>
        ),
        2: (
            <div className={styles.main}>
                <Col s={5} className={styles.box}>
                    <img src={l} alt="."/>
                </Col>
                or
                <Col s={5} className={styles.box}>
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