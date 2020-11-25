import React, { FormEvent, useState, useContext } from 'react'

import logo from '../images/logo.svg';
import '../styles/pages/login.css'

import { Context } from '../context/AuthContext'
import { Link } from 'react-router-dom';

export default function Login() {
    const { authenticated, user, handleLogin } = useContext(Context)
    console.log(authenticated, user);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        handleLogin(email, password)
    }

    return (
        <div id="page-login">
            <div className="left-panel">
                <Link to="/">
                    <img src={logo} alt="Happy" className="icon" />
                </Link>
                <h1>Leve felicidade para o mundo</h1>
                <p>Visite orfanatos e mude o dia de muitas crianças.</p>
            </div>
            <div className="form-container">
                <h1>Login</h1>
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
                </form>

            </div>
        </div>
    )
}