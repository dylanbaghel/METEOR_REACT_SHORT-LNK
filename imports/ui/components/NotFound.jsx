import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="boxed-view">
            <div className="boxed-view__box">
                <h1>404 | Not Found</h1>
                <p>Sorry, The Page You're Looking For Does'nt Exist</p>
                <Link className="button button--link" to="/">Head Home</Link>
            </div>
        </div>
    );
};

export default NotFound;