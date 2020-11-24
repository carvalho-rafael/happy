import React, { useContext } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../context/AuthContext'

import '../styles/components/navbar.css'

export default function NavBar() {
  const { authenticated, user, handleLogout } = useContext(Context)

  const { goBack } = useHistory();

  return (
    <aside className="app-navbar">
      <div className="actions">
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
        {user.is_admin
        ? (
          <Link to="/dashboard/orphanages" className="dashboard-link">
            Dashboard
        </Link>
        ) : null}
      </div>
      <div className="content">
        {authenticated
          ? (<div className="logout-container">
            <p>Welcome, {user.email}!</p>
            <span onClick={handleLogout}>
              Logout
            </span>
          </div>
          ) : (
            <Link to="/login">
              Login
            </Link>
          )}
      </div>
    </aside>
  )
}