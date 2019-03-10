import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            error: null,
            isOpen: false
        };
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    handleUrlChange(e) {
        const url = e.target.value;
        this.setState({
            url
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const { url } = this.state;
        Meteor.call('links.insert', url.trim(), (err) => {
            if (err) {
                this.setState({
                    error: err.reason
                });
            } else {
                this.clearState();
            }
        });

    }

    clearState() {
        this.setState({
            url: "",
            error: null,
            isOpen: false
        });
    }

    render() {
        return (
            <div>
                <button className="button" onClick={() => {
                    this.setState({
                        isOpen: true
                    });
                }}>+ Add Link</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add Link"
                    ariaHideApp={false}
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={() => this.clearState()}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                >
                    <h1>Add Link</h1>
                    {this.state.error && <p>{this.state.error}</p>}
                    <form className="boxed-view__form" onSubmit={this.onSubmit}>
                        <input
                            type="text"
                            placeholder="Enter Url"
                            ref="url"
                            value={this.state.url}
                            onChange={this.handleUrlChange}
                        />
                        <button type="submit" className="button">Add Link</button>
                        <button type="button" className="button  button--secondary" onClick={() => {
                            this.clearState();
                        }}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    };
}

export default AddLink;