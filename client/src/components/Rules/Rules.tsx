import React from 'react'
import { connect } from 'react-redux'

interface Props {}

const Rules: React.FC<Props> = (props) => {
  return (
    <h4 className="col s12 l10" style={{ textAlign: 'left' }}>
      {'Rules'.toUpperCase()}
    </h4>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Rules)
