import React from 'react'

import { Link } from 'react-router-dom'
import { FiArrowRight, FiKey } from 'react-icons/fi'
import logo from '../images/logo.svg'

import '../styles/pages/landing.css'

function Landing() {
  return (
    <div className="App" id="page-landing">
      <div className="content-wrapper">
        <header>
          <img src={logo} alt="happy-logo" />
          <div>
            <strong>Salvador - </strong><span>Bahia</span>
            <Link to="/login" >
              <FiKey size="30px" color="rgba(0,0,0, .8)" />
            </Link>
          </div>
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
  )
}

export default Landing;