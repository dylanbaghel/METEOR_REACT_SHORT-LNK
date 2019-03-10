import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest} 
            render={(props) => {
                return !!Meteor.userId() ? <Component {...props}/> : <Redirect to="/" />
            }}
        />
    );
};

export default PrivateRoute;