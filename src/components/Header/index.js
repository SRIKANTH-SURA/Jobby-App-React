import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderDesktopMenu = () => (
    <ul className="desktop-nav-menu">
      <li className="nav-menu-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-menu-item">
        <Link to="/jobs" className="nav-link">
          Jobs
        </Link>
      </li>
    </ul>
  )

  const renderMobileMenu = () => (
    <ul className="mobile-nav-menu">
      <li className="nav-menu-item">
        <Link to="/" className="nav-link">
          <AiFillHome />
        </Link>
      </li>
      <li className="nav-menu-item">
        <Link to="/jobs" className="nav-link">
          <BsFillBriefcaseFill />
        </Link>
      </li>
    </ul>
  )

  return (
    <div className="header">
      <div className="header-content">
        <div className="navbar">
          <Link to="/" className="nav-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="mobile-nav-website-logo"
              alt="website logo"
            />
          </Link>

          {renderDesktopMenu()}
          {renderMobileMenu()}
        </div>
        <button
          type="button"
          className="mobile-logout-btn"
          onClick={onClickLogout}
        >
          <FiLogOut />
        </button>
        <button
          type="button"
          className="desktop-logout-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
