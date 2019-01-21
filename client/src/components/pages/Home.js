import React from "react";

class Home extends React.Component {
  render() {
    const isLoggedIn = this.props.userInfo !== null;
    return (
      <div>
        <div>
          Home
          {isLoggedIn ? (
            <div>You are logged in</div>
          ) : (
            <div>You are not logged in</div>
          )}
        </div>
        
      </div>
    );
  }
}

export default Home;