import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import { FiArrowRight, FiKey } from 'react-icons/fi'
import logo from '../images/logo.svg'

import '../styles/pages/landing.css'
import { Context } from '../context/AuthContext'

function Landing() {
  const { authenticated, user, handleLogout } = useContext(Context)

  return (
    <div>
      <div className="App" id="page-landing">
        <div className="content-wrapper">
          <header>
            <img src={logo} alt="happy-logo" />
            {authenticated
              ? (<div className="logout-container">
                <p>Welcome, {user.email}!</p>
                <a type="button" onClick={handleLogout}>
                  Logout
                </a>
              </div>
              ) : (
                <Link type="button" to="/login" className="link-login">
                  Login
                </Link>
              )}

          </header>

          <main>
            <h1>Leve felicidade para o mundo</h1>
            <p>Visite orfanatos e mude o dia de muitas crianças.</p>
            <Link to="/app" className="link-go-app">
              <FiArrowRight size="30px" color="rgba(0,0,0, .8)" />
            </Link>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Landing;