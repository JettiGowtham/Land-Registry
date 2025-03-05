import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaUser, FaBell, FaSignOutAlt } from 'react-icons/fa'
import './Header.css'

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
    if (notificationsOpen) setNotificationsOpen(false)
  }

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen)
    if (dropdownOpen) setDropdownOpen(false)
  }

  // Mock notifications
  const notifications = [
    { id: 1, message: 'Your land registration was approved', time: '2 hours ago' },
    { id: 2, message: 'New property transaction request', time: '1 day ago' },
    { id: 3, message: 'Land boundary verification completed', time: '3 days ago' }
  ]

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <Link to="/" className="logo">
          Smart Land Governance
        </Link>
      </div>
      <div className="header-right">
        <div className="notification-container">
          <button className="icon-button" onClick={toggleNotifications}>
            <FaBell />
            <span className="badge">3</span>
          </button>
          {notificationsOpen && (
            <div className="dropdown-menu notifications">
              <h3>Notifications</h3>
              {notifications.map(notification => (
                <div key={notification.id} className="notification-item">
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
              ))}
              <div className="dropdown-footer">
                <Link to="/">View all notifications</Link>
              </div>
            </div>
          )}
        </div>
        <div className="user-container">
          <button className="user-button" onClick={toggleDropdown}>
            <FaUser />
            <span>Admin</span>
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">
                <FaUser /> Profile
              </Link>
              <Link to="/logout" className="dropdown-item">
                <FaSignOutAlt /> Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header