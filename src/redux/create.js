import {createStore as _createStore, applyMiddleware, compose} from 'redux'
import createMiddleware from './middleware/clientMiddleware'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'

export default function createStore (history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history)

  const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk]

  let finalCreateStore
  if (__DEVELOPMENT__ && __CLIENT__) {
    const createLogger = require('redux-logger')
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      applyMiddleware(createLogger())
    )(_createStore)
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore)
  }

  const reducer = require('./modules/reducer')
  const store = finalCreateStore(reducer, data)

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'))
    })
  }

  return store
}
