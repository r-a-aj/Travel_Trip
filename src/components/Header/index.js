import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {Context} from '../Context/context'
import './index.css'

function Header() {
  const {isAuthenticated, logout} = useContext(Context)

  return (
    <header className="header">
      <h1 className="logo">Travel Trip</h1>
      <nav>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/MyTrips" style={{fontWeight: '400'}} className="nav-link">
          My Trips
        </Link>
      </nav>
      {isAuthenticated && (
        <button type="button" className="logout-button" onClick={logout}>
          Logout
        </button>
      )}
    </header>
  )
}

export default Header
