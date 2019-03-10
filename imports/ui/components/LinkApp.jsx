import React from 'react';

import LinkList from './LinkList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import FilterLinks from './FilterLinks';

class LinkApp extends React.Component {
    render() {
        return (
            <div>
                <PrivateHeader title="Short Lnk" />
                <div className="page-content">
                    <FilterLinks />
                    <AddLink />
                    <LinkList />
                </div>
            </div>
        );
    }
}

export default LinkApp;