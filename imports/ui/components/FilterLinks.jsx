import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

class FilterLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }

    componentDidMount() {
        this.showVisibilityTracker = Tracker.autorun(() => {
            const showVisibility = Session.get('showVisible');
            this.setState({
                checked: !showVisibility
            });
        });
    }

    componentWillUnmount() {
        this.showVisibilityTracker.stop();
    }

    render() {
        return (
            <div>
                <label className="checkbox">
                    <input className="checkbox__input" type="checkbox" checked={this.state.checked} onChange={(e) => {
                        Session.set('showVisible', !e.target.checked);
                    }} />
                    Show Hidden Links
                </label>
            </div>
        );
    };
}

export default FilterLinks;