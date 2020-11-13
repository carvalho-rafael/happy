import React, { FormEvent, useState, useContext } from 'react'

import mapMarkerImg from '../images/local.svg';
import '../styles/pages/login.css'

import { Context } from '../context/AuthContext'

export default function Login() {
    const { authenticated, handleLogin, handleLogout } = useContext(Context)
    console.log(authenticated);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        handleLogin(email, password)
        const data = {
            email
        }
    }

    return (
        <div id="page-login">
            <img src={mapMarkerImg} alt="Happy" className="icon" />

            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-block">
                    <label htmlFor="email">Email</label>
                    <input id="name" type="text" value={email} onChange={event => setEmail(event.target.value)} />
                </div>
                <div className="input-block">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="text" value={password} onChange={event => setPassword(event.target.value)} />
                </div>
                <button className="confirm-button" type="submit">
                    Login
                </button>
                <button className="confirm-button" type="button" onClick={handleLogout}>
                    Logout
                </button>
            </form>
        </div>
    )
}