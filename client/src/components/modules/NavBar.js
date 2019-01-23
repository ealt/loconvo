import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 0,
            lon: 0,
        };
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
                    <Link to="/map" className="nav-item nav-link">Map</Link>
                </div>
                <form>
                    <input 
                        type="number" 
                        placeholder="lat" 
                        value={this.state.lat}
                        onChange={this.handleLatChange}
                    />
                </form>
                <form>
                    <input 
                        type="number" 
                        placeholder="lon" 
                        value={this.state.lon}
                        onChange={this.handleLonChange}
                    />
                </form>
                <button onClick={this.handleSubmit}>Set Location</button>
            </nav>
        );
    }

    handleLatChange = (event) => {
        this.setState({lat: event.target.value});
    }
    
    handleLonChange = (event) => {
        this.setState({lon: event.target.value});
    }

    handleSubmit = () => {
        event.preventDefault();
        this.props.setLocation(this.state.lat, this.state.lon);
    }
}

export default NavBar;