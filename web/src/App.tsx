import React from 'react';
import './styles/global.css'

import Routes from './routes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
        <Routes />
    </AuthProvider>
  );
}

export default App;
