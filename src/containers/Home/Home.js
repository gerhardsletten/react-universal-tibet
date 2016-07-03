import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {setCouter} from 'redux/modules/counter'
import style from './style.css'

@connect(
  (state) => ({
    count: state.counter.count
  }),
  {
    setCouter
  }
)
export default class MapList extends Component {
  static propTypes = {
    count: PropTypes.number,
    setCouter: PropTypes.func
  }

  onClick (num) {
    const {count} = this.props
    this.props.setCouter(count + num)
  }

  render () {
    const {count} = this.props
    return (
      <div>
        <Helmet title='Home'/>
        <h1>Home</h1>
        <p>A generic public counter: {count}</p>
        <button onClick={this.onClick.bind(this, -1)}>- Mink</button>
        <button onClick={this.onClick.bind(this, 1)}>+ Øk</button>
      </div>
    )
  }
}
