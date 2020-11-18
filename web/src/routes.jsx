import React, { useContext } from 'react'
import { Switch, Route, Router, Redirect } from 'react-router-dom'
import CreateOrphanage from './pages/CreateOrphanage';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Orphanage from './pages/Orphanage';
import OrphanagesMap from './pages/OrphanagesMap';

import { Context } from './context/AuthContext'

import history from './history'

function CustomRoute({ isPrivate, ...rest }) {
    const { loading, authenticated } = useContext(Context)

    if (loading) {
        return <p>Loading...</p>
    }

    if(isPrivate && !authenticated) {
        return <Redirect to="/login" />
    }

    return <Route {...rest} />
}

function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <CustomRoute path="/" component={Landing} exact />
                <CustomRoute isPrivate path="/app" component={OrphanagesMap} />
                <CustomRoute path="/orphanages/create" component={CreateOrphanage} />
                <CustomRoute path="/orphanages/:id" component={Orphanage} />
                <CustomRoute path="/login" component={Login} />
            </Switch>
        </Router>
    )
}

export default Routes;