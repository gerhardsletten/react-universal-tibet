import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {asyncConnect} from 'redux-connect'
import {Link} from 'react-router'
import {isLoaded as isAuthLoaded, load as loadAuth, logout} from 'redux/modules/auth'
import {push} from 'react-router-redux'
import config from 'config'
import style from './style.css'

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = []
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()))
    }
    return Promise.all(promises)
  }
}])
@connect(
  (state) => ({
    user: state.auth.user
  }),
  {
    pushState: push,
    logout
  }
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  handleLogout = (event) => {
    event.preventDefault()
    this.props.logout()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.pushState('/mypage')
    } else if (this.props.user && !nextProps.user) {
      this.props.pushState('/')
    }
  }

  getNav () {
    const {user} = this.props
    const nav = [{
      url: '/',
      name: 'Home'
    }]
    if (user) {
      return [...nav, {
        url: '/mypage',
        name: 'My Page'
      }]
    }
    return [...nav, {
      url: '/login',
      name: 'Login'
    }]
  }

  render () {
    const {user} = this.props
    const navItems = this.getNav()
    return (
      <div className={style.container}>
        <header className={style.header}>
          <div className={style.holder}>
            <div className={style.pullLeft}>
              <nav className={style.nav}>
                {navItems.map((item, i) => {
                  return (
                    <Link key={i} to={item.url} activeClassName={style.navActive} onlyActiveOnIndex>{item.name}</Link>
                  )
                })}
              </nav>
            </div>
            {user && (
              <div className={style.pullRight}>
                Logged in as {user.username} <button onClick={this.handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </header>
        <main className={style.content}>
          {this.props.children}
        </main>
        <footer className={style.footer}>
          Tibet Universal React app
        </footer>
      </div>
    )
  }
}
