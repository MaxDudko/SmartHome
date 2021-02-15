import React, {useEffect, useState} from 'react'
import { Button, Col, Icon, Table } from 'react-materialize'
import { connect } from 'react-redux'
import {getHomeListAction, selectHomeAction} from '../../actions/homeActions'
import styles from './AddHome.module.scss'

interface Props {
  homeList: any
  userId: string
  getHomeListAction: any
  selectHomeAction: any
}

const SelectHome: React.FC<Props> = (props) => {
  const { homeList, userId, getHomeListAction, selectHomeAction } = props
  const [data, setData] = useState<any>({})

  useEffect(() => {
    userId && getHomeListAction(userId.toString())
  }, [userId])

  const handleSubmit = (event) => {
    event.preventDefault()

    const { userId, homeId } = data

    selectHomeAction(userId.toString(), homeId.toString())
  }

  return (
    <Col s={12} l={10} className={styles.homeForm}>
      <p className={styles.title}>Select Home</p>
      {homeList.length ? (
        <Table>
          <thead>
            <tr>
              <td />
              <td>ID</td>
              <td>Name</td>
              <td>Address</td>
              <td>Role</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {homeList.map((home, i) => (
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
                          userId,
                          homeId: home.id,
                        })
                      }}
                    >
                      Select
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className={styles.error}>
          No one Home not found, please create new Home or join to existing
        </p>
      )}
    </Col>
  )
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  homeList: state.user.homeList,
})

const mapDispatchToProps = (dispatch) => ({
  getHomeListAction: (userId) => dispatch(getHomeListAction(userId)),
  selectHomeAction: (userId, homeId) => dispatch(selectHomeAction(userId, homeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectHome)
