import React from 'react';
import styles from './Overview.module.scss';
import {Row, Col} from "react-materialize";

interface Props {

}
const Overview: React.FC = props =>  {

    return (
        <div className={styles.Overview + " col s12 l10"}>
            <h4>Overview</h4>
            <Row>
                <Col s={12} l={6} className={styles.block} style={{height: '20rem'}}>
                    <p>Camera</p>
                </Col>
                <Col s={12} l={5} style={{height: '20rem'}}>
                    <Col s={12} className={styles.block}>
                        <p>Consumption by room</p>
                    </Col>
                    <Col s={5} className={styles.block}>
                        <p>Consumption by day</p>
                    </Col>
                    <Col s={5} className={styles.block}>
                        <p>Device limit</p>
                    </Col>
                </Col>
            </Row>
            <Col s={12} className={styles.block}>
                <p>Status by units</p>
            </Col>
        </div>
    );
}

export default Overview;
