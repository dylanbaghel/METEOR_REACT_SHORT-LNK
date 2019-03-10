import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest} 
            render={(props) => {
                return !Meteor.userId() ? <Component {...props}/> : <Redirect to="/links" />
            }}
        />
    );
};

export default PublicRoute;