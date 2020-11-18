import { useEffect, useState } from 'react'
import history from '../../history';
    
import api from '../../services/api'

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        
        if(user){
            setUser(JSON.parse(user))
        }

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }

        setLoading(false)
    }, [])

    function handleLogin(email: string, password: string) {
        const data = { email, password }

        api.post('login', data).then(response => {
            const { token, user } = response.data;
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setAuthenticated(true);
            history.push('/app');
        })
    }

    function handleLogout() {
        setAuthenticated(false);
        setUser(undefined)
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        history.push('/login');

    }

    return { authenticated, user, handleLogin, handleLogout, loading }

}