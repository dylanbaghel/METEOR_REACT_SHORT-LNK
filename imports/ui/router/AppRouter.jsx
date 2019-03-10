import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from './../components/Login';
import Signup from './../components/Signup';
import LinkApp from '../components/LinkApp';
import NotFound from './../components/NotFound';

export const history = createHistory();

export const onAuthChangeRouting = (isAuthenticated) => {
    const authenticatedPages = ["/links"];
    const unAuthenticatedPages = ["/", "/signup"];
    const pathname = history.location.pathname;

    if (isAuthenticated && unAuthenticatedPages.includes(pathname)) {
        history.replace("/links");
    } else if (!isAuthenticated && authenticatedPages.includes(pathname)) {
        history.replace("/");
    }
};

const AppRouter = () => {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <PublicRoute
                        exact path="/"
                        component={Login}
                    />
                    <PublicRoute
                        exact path="/signup"
                        component={Signup}
                    />
                    <PrivateRoute
                        exact path="/links"
                        component={LinkApp}
                    />
                    <Route 
                        component={NotFound}
                    />
                </Switch>
            </Router>
        </div>
    );
};

export default AppRouter;