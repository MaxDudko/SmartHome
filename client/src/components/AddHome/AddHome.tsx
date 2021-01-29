import React, {useEffect, useState} from 'react';
import styles from './AddHome.module.scss';
import {connect} from "react-redux";
import {createHomeAction, getHomeListAction, joinHomeAction, selectHomeAction} from "../../actions/homeActions";
import {Table, Form, Button, TextInput, Select, Icon, Row, Col} from "react-materialize/";
import homeImg from "../../images/home.png";

interface Props {
    userId: string;
    homeList: any;
    getHomeListAction: Function;
    selectHomeAction: Function;
    createHomeAction: Function;
    joinHomeAction: Function;
}

const AddHome: React.FC<Props> = props =>  {
    const { userId, getHomeListAction, homeList, selectHomeAction, createHomeAction, joinHomeAction } = props;
    const items = ['Home List', 'Create Home', 'Join Home'];
    const [currentForm, setForm] = useState('Home List');
    const [data, setData] = useState<any>({});

    useEffect(() => {
        userId && getHomeListAction(userId.toString());
    }, [userId])

    const handleSubmit = event => {
        event.preventDefault();

        if (currentForm === 'Home List') {
            const {userId, homeId} = data;
            console.log(data)
            return selectHomeAction(userId.toString(), homeId.toString());
        }

        if (currentForm === 'Create Home') {
            const {userId, homeName, homeAddress, role, key} = data;
            return createHomeAction(userId.toString(), homeName, homeAddress, role, key);
        }

        if (currentForm === 'Join Home') {
            const {userId, homeId, role, key} = data;
            return joinHomeAction(userId.toString(), homeId.toString(), role, key);
        }
    }

    const homeTable = (
        <div>
            <p className={styles.title}>Select Home</p>
            {
                homeList.length ?
                    <Table>
                        <thead>
                        <tr>
                            <td></td><td>ID</td><td>Name</td><td>Address</td><td>Role</td><td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            homeList.map((home, i) => (
                                <tr key={i}>
                                    <td>
                                        <Icon>home</Icon>
                                    </td>
                                    <td>{home.id}</td>
                                    <td>{home.name}</td>
                                    <td>{home.address}</td>
                                    <td>{home.role}</td>
                                    <td>
                                        <form onSubmit={handleSubmit}>
                                            <Button
                                                node="button"
                                                type="submit"
                                                onClick={() => {
                                                    setData({
                                                        ...data,
                                                        userId: userId,
                                                        homeId: home.id,
                                                    })
                                                }}
                                            >
                                                Select
                                            </Button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    :
                    <p className={styles.error}>No one Home not found, please create new Home or join to existing</p>
            }
        </div>
    );

    const createHome = (
        <Col s={12} l={6}>
            <p className={styles.title}>Create Home</p>
            <form onSubmit={handleSubmit}>
                <TextInput
                    id="name"
                    type="text"
                    inputClassName="validate"
                    required
                    label="Home Name"
                    placeholder=""
                    onChange={(e) => {
                        setData({
                            ...data,
                            homeName: e.target.value
                        })
                    }}
                />
                <TextInput
                    id="address"
                    type="text"
                    inputClassName="validate"
                    required
                    label="Home Address"
                    placeholder=""
                    onChange={(e) => {
                        setData({
                            ...data,
                            homeAddress: e.target.value
                        })
                    }}
                />
                <Select
                    id="role"
                    multiple={false}
                    onChange={(e) => {
                        setData({
                            ...data,
                            role: e.target.value
                        })
                    }}
                    value=""
                >
                    <option
                        disabled
                        value=""
                    >
                        Choose your role
                    </option>
                    <option value="admin">
                        admin
                    </option>
                    <option value="user">
                        user
                    </option>
                </Select>
                <TextInput
                    id="key"
                    type="password"
                    inputClassName="validate"
                    required
                    label="Security Key"
                    placeholder=""
                    onChange={(e) => {
                        setData({
                            ...data,
                            key: e.target.value
                        })
                    }}
                />
                <Button
                    node="button"
                    type="submit"
                    onClick={() => {
                        setData({
                            ...data,
                            userId: userId,
                        })
                    }}
                >
                    Create
                </Button>
            </form>
        </Col>
    );

    const joinHome = (
        <Col s={12} l={6}>
            <p className={styles.title}>Join Home</p>
            <form onSubmit={handleSubmit}>
                <TextInput
                    id="homeId"
                    type="text"
                    inputClassName="validate"
                    required
                    label="Home ID"
                    placeholder=""
                    onChange={(e) => {
                        setData({
                            ...data,
                            homeId: e.target.value
                        })
                    }}
                />
                <Select
                    id="role"
                    multiple={false}
                    onChange={(e) => {
                        setData({
                            ...data,
                            role: e.target.value
                        })
                    }}
                    value=""
                >
                    <option
                        disabled
                        value=""
                    >
                        Choose your role
                    </option>
                    <option value="admin">
                        admin
                    </option>
                    <option value="user">
                        user
                    </option>
                </Select>
                <TextInput
                    id="key"
                    type="password"
                    inputClassName="validate"
                    required
                    label="Security Key"
                    placeholder=""
                    onChange={(e) => {
                        setData({
                            ...data,
                            key: e.target.value
                        })
                    }}
                />
                <Button
                    node="button"
                    type="submit"
                    onClick={() => {
                        setData({
                            ...data,
                            userId: userId,
                        })
                    }}
                >
                    Join
                </Button>
            </form>
        </Col>
    );

    return (
        <Row className={styles.AddHome}>
            <Col s={12} l={2}>
                <ul className={styles.menu}>
                    {
                        items.map((item, i) => (
                            <li
                                className={styles.item + ` ${item === currentForm && styles.active}` }
                                key={i}
                                onClick={() => setForm(item)}
                            >
                                <span className={styles.title}>{item}</span>
                            </li>
                        ))
                    }
                </ul>
            </Col>
            <Col s={12} l={10}>
                {
                    currentForm === 'Home List' && homeTable
                    ||
                    currentForm === 'Create Home' && createHome
                    ||
                    currentForm === 'Join Home' && joinHome
                }
            </Col>
        </Row>
    );
}

const mapStateToProps = state => ({
    userId: state.user.id,
    homeList: state.user.homeList,
})

const mapDispatchToProps = dispatch => ({
    getHomeListAction: userId => dispatch(getHomeListAction(userId)),
    selectHomeAction: (userId, homeId) => dispatch(selectHomeAction(userId, homeId)),
    createHomeAction: (userId, homeName, homeAddress, role, key) => dispatch(createHomeAction(userId, homeName, homeAddress, role, key)),
    joinHomeAction: (userId, homeId, role, key) => dispatch(joinHomeAction(userId, homeId, role, key)),
})
export default connect(mapStateToProps, mapDispatchToProps)(AddHome);