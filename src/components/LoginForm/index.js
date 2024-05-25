import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onSubmitSuccess = token => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', token, {expires: 60})
  }

  onSubmitFailure = msg => {
    this.setState({showSubmitError: true, errorMsg: msg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    console.log(response)
    if (response.status === 200) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {password, username, errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-page-logo"
            alt="website logo"
          />
          <div className="input-container">
            <label htmlFor="Username" className="label">
              Username
            </label>
            <input
              onChange={this.onChangeUsername}
              id="Username"
              type="text"
              className="input"
              placeholder="Username"
              value={username}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              onChange={this.onChangePassword}
              value={password}
              placeholder="Password"
              type="Password"
              className="input"
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {showSubmitError && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
