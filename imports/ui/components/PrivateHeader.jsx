import React from 'react';
import { Meteor } from 'meteor/meteor';

const PrivateHeader = ({
    title
}) => {
    return (
        <div className="private-header">
            <div className="private-header__content">
                <h1 className="private-header__title">{title}</h1>
                <button className="button button--link-text" onClick={() => {
                    Meteor.logout();
                }}>Logout</button>
            </div>
        </div>
    );
};

export default PrivateHeader;