import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isLoggedIn = this.props.userInfo !== null;
        return (
            <nav className="navbar">
                <div className="navbar-brand">SiteName</div>
                <div className="navbar-nav">
                    <Link to="/" className="nav-item nav-link">Home</Link>
                    { isLoggedIn ? (
                        <Fragment>
                            <Link to={"/profile/" + this.props.userInfo._id} className="nav-item nav-link">Profile</Link>
                            <a className="nav-item nav-link" href="/logout" onClick={this.props.logout}>Logout</a>
                        </Fragment>
                    ) : (
                        <a className="nav-item nav-link" href="/auth/google">Login</a>
                    )}
                    <Link to="/conversations" className="nav-item nav-link">Conversations</Link>
                </div>
            </nav>
        );
    }
}

export default NavBar;