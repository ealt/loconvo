import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: null,
      lat: 0,
      lon: 0,
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
        {profileOwner ? (
          <div>
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
            <button onClick={this.handleSetSubmit}>Set Location</button>
            <button onClick={this.handleGetSubmit}>Update Location</button>
          </div>) 
          :
          (<div/>)
        }
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

  handleLatChange = (event) => {
    this.setState({lat: event.target.value});
  }

  handleLonChange = (event) => {
    this.setState({lon: event.target.value});
  }

  handleSetSubmit = () => {
    event.preventDefault();
    this.props.setLocation(this.state.lat, this.state.lon);
  }

  handleGetSubmit = () => {
    event.preventDefault();
    const options = {
        enableHighAccuracy: true,
        timout: 10000,
        maximumAge: 0,
    }
    navigator.geolocation.getCurrentPosition(
        this.locateSuccess,
        this.locateError,
        options
    );
  }

  locateSuccess = (pos) => {
    this.props.setLocation(pos.coords.latitude, pos.coords.longitude)
  }

  locateError = (pos) => {
    alert("Sorry, failed to get position")
  }
}

export default Profile;