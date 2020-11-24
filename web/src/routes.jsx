import React, { useContext } from 'react'
import { Switch, Route, Router, Redirect } from 'react-router-dom'
import CreateOrphanage from './pages/CreateOrphanage';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Orphanage from './pages/Orphanage';
import OrphanagesMap from './pages/OrphanagesMap';

import { Context } from './context/AuthContext'

import history from './history'
import Orphanages from './pages/dashboard/index';
import adminOrphanage from './pages/dashboard/Orphanage';

function CustomRoute({ isPrivate, isAdmin, ...rest }) {
    const { loading, authenticated, user } = useContext(Context)

    if (loading) {
        return <p>Loading...</p>
    }

    if(isAdmin && !user.is_admin) {
        return <Redirect to="/" />
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
                <CustomRoute isPrivate path="/orphanages/create" component={CreateOrphanage} />
                <CustomRoute isPrivate path="/orphanages/:id" component={Orphanage} />
                <CustomRoute path="/login" component={Login} />

                <CustomRoute isAdmin path="/dashboard/orphanages" component={Orphanages} exact />
                <CustomRoute isAdmin path="/dashboard/orphanages/:id" component={adminOrphanage} />
            </Switch>
        </Router>
    )
}

export default Routes;