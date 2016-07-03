import React, {Component, PropTypes} from 'react'
import style from './style.css'

export default class TestComponent extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render () {
    const {name} = this.props
    return (
      <div className={style.container}>
        Hello {name}
      </div>
    )
  }
}
