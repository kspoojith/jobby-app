import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdHome} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'
import {IoMdLogOut} from 'react-icons/io'

import './index.css'

const Header = props => {
  const {history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-bar-desktop-view">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" onClick={onLogout} className="logout-btn-desktop">
          Logout
        </button>
      </div>
      <div className="nav-bar-mobile-view">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="mobile-logo"
          />
        </Link>
        <ul className="icons">
          <li>
            <Link to="/" className="nav-link">
              <MdHome className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              <FaSuitcase className="nav-suitcase-icon" />
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={onLogout}
          className="mobile-logout-btn"
          aria-label="Logout"
        >
          <IoMdLogOut className="mobile-logout-btn" />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
