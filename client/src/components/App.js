import React, { Component } from 'react';
import "../css/app.css";

import { Route, Switch, withRouter } from 'react-router-dom';

import NavBar from "./modules/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Conversations from "./pages/Conversations";
import Convo from "./pages/Convo";
import LocalMap from "./pages/LocalMap";
import NotFound from "./pages/NotFound";
//import { runInThisContext } from "vm";

const routes = [
  {
    path: "/",
    component: Home,
    key: "home"
  },
  {
    path: "/profile/:userId",
    component: Profile,
    key: "profile"
  },
  {
    path: "/conversations",
    component: Conversations,
    key: "conversations"
  },
  {
    path: "/convo/:convoId",
    component: Convo,
    key: "convo"
  },
  {
    path: "/map",
    component: LocalMap,
    key: "map"
  }
]

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <div>
        <NavBar
          userInfo={this.state.userInfo}
          setLocation={this.setLocation.bind(this)}
          logout={this.logout}
        />
        <Switch>
          {routes.map(({path, component:C, key}, i) => (
            <Route 
              exact path={path}
              render={(props) => 
                <C {...props} 
                  userInfo={this.state.userInfo}
                  setLocation={this.setLocation.bind(this)}
                />}
              key={key}
            />
          ))}
          <Route
            path="*"
            render={(props) => <NotFound {...props} 
                userInfo={this.state.userInfo}
              />}
          />
        </Switch>
      </div>
    );
  }
  
  logout = () => {
    this.setState({
        userInfo: null
    });
  };

  getUser = () => {    
    fetch('/api/whoami')
    .then(res => res.json())
    .then(
        userObj => {
            if (userObj._id !== undefined) {
                this.setState({ 
                    userInfo: userObj
                });
            } else {
                this.setState({ 
                    userInfo: null
                });
            }
        }
    );
  }

  setLocation = (lat, lon) => {
    /*this.setState({
      latitude: lat,
      longitude: lon,
    });*/
    const body = {
      'latitude': lat,
      'longitude': lon,
    };
    fetch('/api/location', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(body),
    })
    .then(this.updateUserInfo)
  }

  updateUserInfo = () => {
    if (this.state.userInfo) {
      fetch("/api/user?_id=" + this.state.userInfo._id)
        .then(res => res.json())
        .then(userObj => {
          this.setState({userInfo: userObj})
        })
    }
  }
}

export default withRouter(App);