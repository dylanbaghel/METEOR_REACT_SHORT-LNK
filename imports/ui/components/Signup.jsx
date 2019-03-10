import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class Signup extends React.Component {
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

    handleEmailChange(e) {
        const email = e.target.value;
        this.setState(() => ({
            email
        }));
    }

    handlePasswordChange(e) {
        const password = e.target.value;
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
        } else if (this.state.password < 6) {
            this.setState(() => ({
                errors: { password: "Password At Least 8 Characters" }
            }));
        }

        Accounts.createUser({
            email: this.state.email,
            password: this.state.password
        }, (err) => {
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
                console.log('Signup Called', err);
                this.clearState();
            }
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
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
                    <h1>Signup</h1>
                    {this.state.errors.message && <p>{this.state.errors.message}</p>}
                    <form onSubmit={this.onSubmit} className="boxed-view__form" noValidate>
                        <input
                            type="text"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                        {this.state.errors.email && <p>{this.state.errors.email}</p>}
                        <input
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                        {this.state.errors.password && <p>{this.state.errors.password}</p>}
                        <button className="button" type="submit">Signup</button>
                    </form>
                    <p>Already Have an account | <Link to="/">Login</Link></p>
                </div>
            </div>
        );
    }
}

export default Signup;