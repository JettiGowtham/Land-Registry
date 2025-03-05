import { Link, useLocation } from 'react-router-dom'
import { 
  FaHome, 
  FaBook, 
  FaMap, 
  FaExchangeAlt, 
  FaCheckCircle, 
  FaUsers, 
  FaCog, 
  FaQuestionCircle 
} from 'react-icons/fa'
import './Sidebar.css'

const Sidebar = ({ isOpen }) => {
  const location = useLocation()
  
  const menuItems = [
    { path: '/', icon: <FaHome />, label: 'Dashboard' },
    { path: '/land-registry', icon: <FaBook />, label: 'Land Registry' },
    { path: '/land-map', icon: <FaMap />, label: 'Land Map' },
    { path: '/property-transactions', icon: <FaExchangeAlt />, label: 'Property Transactions' },
    { path: '/ownership-verification', icon: <FaCheckCircle />, label: 'Ownership Verification' },
    { path: '/users', icon: <FaUsers />, label: 'Users' },
    { path: '/settings', icon: <FaCog />, label: 'Settings' },
    { path: '/help', icon: <FaQuestionCircle />, label: 'Help & Support' }
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>SLGS</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>© 2025 Smart Land Governance</p>
      </div>
    </aside>
  )
}

export default Sidebar