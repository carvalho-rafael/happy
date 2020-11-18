import React, { createContext } from 'react'
import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
    const { authenticated, user, handleLogin, handleLogout, loading } = useAuth();

    return (
        <Context.Provider value={{ authenticated, user, handleLogin, handleLogout, loading }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }