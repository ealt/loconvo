import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: null,
    }
  }

  componentDidMount() {
    this.getProfile(this.props.match.params.userId);
    document.title = "Profile Page";
  }
  
  render() {
    const isLoggedIn = this.props.userInfo !== null;
    const profileOwner = isLoggedIn && this.state.id === this.props.userInfo._id
    return (
      <div>
        <div>Profile</div>
        <div>
          {isLoggedIn ? this.props.userInfo.name : ("anon ")} 
          is viewing {this.state.name}'s Profile as
          {profileOwner ? (" the owner") : (" a guest")}
        </div>
      </div>
    )
    ;
  }

  getProfile = (id, ownId) => {
    fetch("/api/user?_id=" + id)
      .then(res => res.json())
      .then(
        userObj => {
          this.setState({
            id: id,
            name: userObj.name,
          });
        }
      )
  }
}

export default Profile;