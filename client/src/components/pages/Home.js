import React, { Component } from 'react';

class Home extends Component {  
  render() {
    const isLoggedIn = this.props.userInfo !== null;
    const hasLocation = this.props.latitude !== null && this.props.longitude !== null;
    return (
      <div>
        <div>Home</div>
        <div>
          {isLoggedIn ? (
            <div>You are logged in</div>
          ) : (
            <div>You are not logged in</div>
          )}
        </div>
        <div>
          {hasLocation ? (
            <div>
              <div>You have a location</div>
              <div>latitude: {this.props.latitude}</div>
              <div>longitude: {this.props.longitude}</div>
            </div>
          ) : (
            <div>You do not have a location</div>
          )}
        </div>
        <button
          type="submit"
          value="Submit"
          onClick={this.handleSubmit}
        >Execute Test</button>
      </div>
    );
  }

  handleSubmit = (event) => {
    console.log("Success");
  }

}

export default Home;