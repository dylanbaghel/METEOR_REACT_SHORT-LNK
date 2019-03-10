import React from 'react';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';

import formatTime from './../../utils/formatTime';

class LinkListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
    }
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard.on('success', () => {
            this.setState({
                copied: true
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    copied: false
                });
            }, 1000);
        }).on('error', () => {
            alert('Unable To Copy | Please Copy Manually')
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
        clearTimeout(this.timeout);
    }

    render() {
        const{ link, shortUrl } = this.props;
        return (
            <div className="item">
                <h2>{link.url}</h2>
                <p className="item__message">{shortUrl}</p>
                <p className="item__message">{link.visitedCount} Visits {link.lastVisited && `(${formatTime(link.lastVisited)})`}</p>
                <a className="button button--link button--outline" href={shortUrl} target="_blank">Visit</a>
                <button className="button button--outline" onClick={() => {
                    Meteor.call('links.setVisibility', link._id, !link.visible);
                }}>{link.visible ? "Hide" : "Unhide"}</button>
                <button className="button button--outline" ref="copy" data-clipboard-text={shortUrl}>{this.state.copied ? "Copied" : "Copy"}</button>
            </div>
        );
    };
}

export default LinkListItem;