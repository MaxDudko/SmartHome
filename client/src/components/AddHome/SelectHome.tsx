import React from 'react'
import { Button, Icon, Table, TextInput } from 'react-materialize'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './AddHome.module.scss'

interface Props {
  homeList: any
  handleSubmit: any
  setData: any
  data: any
  userId: string
}

const SelectHome: React.FC<Props> = (props) => {
  const { homeList, handleSubmit, setData, data, userId } = props
  return (
    <div>
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
                          ...data,
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
    </div>
  )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SelectHome)
