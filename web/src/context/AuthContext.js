import React, { createContext, useEffect, useState } from 'react'
import history from '../history';
    
import api from '../services/api'

const Context = createContext();

function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }

        setLoading(false)
    }, [])

    function handleLogin(email, password) {
        const data = { email, password }

        api.post('login', data).then(response => {
            const { token, user } = response.data;
            localStorage.setItem('token', JSON.stringify(token));
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setAuthenticated(true);
            history.push('/app');
        })
    }

    function handleLogout() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        history.push('/login');

    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin, handleLogout, loading }}>
            {children}
        </Context.Provider>
    )

}

export { Context, AuthProvider }