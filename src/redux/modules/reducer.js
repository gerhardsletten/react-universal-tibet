import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-connect'

import auth from './auth'
import counter from './counter'
import info from './info'
import products from './products'
import cart from './cart'

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  counter,
  info,
  products,
  cart
})
