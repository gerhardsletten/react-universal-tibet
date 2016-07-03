import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth'
import {
    App,
    Home,
    Login,
    MyPage,
    NotFound
} from 'containers'

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth () {
      const {auth: { user }} = store.getState()
      if (!user) {
        replace('/login')
      }
      cb()
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth)
    } else {
      checkAuth()
    }
  }

  return (
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route onEnter={requireLogin}>
        <Route path='/mypage' component={MyPage}/>
      </Route>
      <Route path='login' component={Login}/>
      <Route path='*' component={NotFound} status={404}/>
    </Route>
  )
}
