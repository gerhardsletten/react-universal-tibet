import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {login} from 'redux/modules/auth'

@connect(
  (state) => ({
    user: state.auth.user,
    error: state.auth.loginError
  }),
  {
    login
  }
)
export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    user: PropTypes.object,
    error: PropTypes.string
  }

  state = {
    username: '',
    password: ''
  }

  handleChange = (name, event) => {
    this.setState({...this.state, [name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {username, password} = this.state
    this.props.login(username, password)
  }

  render () {
    const {user, error} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <Helmet title='Login'/>
        {error && (
          <p style={{color: 'red'}}><strong>Error:</strong> {error}</p>
        )}
        {!user && (
          <p>
            <input type='text' value={this.state.username} onChange={this.handleChange.bind(this, 'username')} placeholder='Username' />
            <input type='password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} placeholder='Password' />
            <button type='submit'>Login</button>
          </p>
        )}
        {user && (
          <p>
            You are logged in as {user.username}
          </p>
        )}
      </form>
    )
  }
}
