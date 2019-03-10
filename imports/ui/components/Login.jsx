import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    handleEmailChange(e) {
        const email = e.target.value.trim();
        this.setState(() => ({
            email
        }));
    }

    handlePasswordChange(e) {
        const password = e.target.value.trim();
        this.setState(() => ({
            password
        }));
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.state.email) {
            this.setState(() => ({
                errors: { email: "Email is Required" }
            }));
            return;
        }
        if (!this.state.password) {
            this.setState(() => ({
                errors: { password: "Password is Required" }
            }));
            return;
        }

        Meteor.loginWithPassword({ email: this.state.email }, this.state.password, (err) => {
            if (err) {
                this.setState({
                    errors: { message: err.reason }
                });

                this.timeout = setTimeout(() => {
                    this.setState({
                        errors: { message: "" }
                    });
                }, 5000);
            } else {
                this.clearState();
                console.log('Login Called', err);
            }
        });
    }

    clearState() {
        this.setState(() => ({
            email: "",
            password: "",
            errors: {}
        }));
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Login</h1>
                    {this.state.errors.message && <p>{this.state.errors.message}</p>}
                    <form onSubmit={this.onSubmit} className="boxed-view__form" noValidate>
                        <input
                            type="text"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                        {this.state.errors.email && <p className="boxed-view__input-error">{this.state.errors.email}</p>}
                        <input
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                        {this.state.errors.password && <p className="boxed-view__input-error">{this.state.errors.password}</p>}
                        <button className="button" type="submit">Login</button>
                    </form>
                    <p>Need an account | <Link to="/signup">Signup</Link></p>
                </div>
            </div>
        );
    }
}

export default Login;