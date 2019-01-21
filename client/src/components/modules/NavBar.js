import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar">
                <div className="navbar-brand">SiteName</div>
                <div className="navbar-nav">
                    <Link to="/" className="nav-item nav-link">Home</Link>
                        { this.props.userInfo === null ? (
                            <a className="nav-item nav-link" href="/auth/google">Login</a>
                        ) : (
                            <React.Fragment>
                                <Link to={"/profile/" + this.props.userInfo._id} className="nav-item nav-link">Profile</Link>
                                <a className="nav-item nav-link" href="/logout" onClick={this.props.logout}>Logout</a>
                            </React.Fragment>
                        )}
                    <Link to="/conversations" className="nav-item nav-link">Conversations</Link>
                    <Link to="/map" className="nav-item nav-link">Map</Link>
                </div>
            </nav>
        );
    }
}

export default NavBar;