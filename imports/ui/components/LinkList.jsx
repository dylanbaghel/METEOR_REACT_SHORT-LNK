import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from './../../api/links';

import LinkListItem from './LinkListItem';

class LinkList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }

    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState(() => ({
                links
            }));
        });
    }

    componentWillUnmount() {
        this.linksTracker.stop();
    }

    render() {
        if (this.state.links.length === 0) {
            return <div className="item">
                <p className="item__status-message">No Links Found</p>
            </div>
        }
        return (
            <div>
                <FlipMove
                    maintainContainerHeight={true}
                >
                    {this.state.links.map(link => {
                        const shortUrl = Meteor.absoluteUrl(link._id);
                        return <LinkListItem key={link._id} shortUrl={shortUrl} link={link} />
                    })}
                </FlipMove>
            </div>
        );
    }
}

export default LinkList;