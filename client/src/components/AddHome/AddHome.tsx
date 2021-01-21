import React, {useState} from 'react';
import styles from './AddHome.module.scss';
import {connect} from "react-redux";


interface Props {
    currentPage: string;
    addDeviceModalOpen: boolean;
}
const AddHome: React.FC<Props> = props =>  {
    const {  } = props;

    return (
        <div className={styles.AddHome}>

        </div>
    );
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = state => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddHome);