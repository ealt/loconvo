import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      id: null,
      profileOwner: null,
    }
  }

  componentDidMount() {
    this.getProfile(this.props.match.params.userId, this.props.userInfo._id);
    document.title = "Profile Page";
  }
  
  render() {
    return (
      <div>
        <div>Profile</div>
        {this.props.userInfo.name} is viewing {this.state.name}'s Profile as
        {this.state.profileOwner ? (" the owner") : (" a guest")}
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
            name: userObj.name,
            id: id,
          });
          id === ownId ? (
            this.setState({profileOwner: true})
          ) : (
            this.setState({profileOwner: false})
          );
        }
      )
  }
}

export default Profile;