import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {asyncConnect} from 'redux-connect'
import {isLoaded as isInfoLoaded, load as loadInfo} from 'redux/modules/info'
import Helmet from 'react-helmet'
import {Link} from 'react-router'
import config from 'config'
import style from './style.css'

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = []
    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()))
    }
    return Promise.all(promises)
  }
}])
@connect(
  (state) => ({
    products: state.info.data
  })
)
export default class MyPage extends Component {
  render () {
    const {products} = this.props
    return (
      <div>
        <Helmet title='Your products'/>
        <h1>Your products</h1>
        <ul>
          {products.map((product, i) => {
            return (
              <li key={i}>{product.title} ({product.isbn})</li>
            )
          })}
        </ul>
      </div>
    )
  }
}
