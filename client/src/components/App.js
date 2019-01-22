import React, { Component } from 'react';
import "../css/app.css";

import { Route, Switch, withRouter } from 'react-router-dom';

import NavBar from "./modules/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Conversations from "./pages/Conversations";
import Convo from "./pages/Convo";
import LocalMap from "./pages/LocalMap";
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
      latitude: null,
      longitude: null,
    };
  }

  componentDidMount() {
    this.getUser();
    this.getLocation();
  }

  render() {
    return (
      <div>
        <NavBar
          userInfo={this.state.userInfo}
          logout={this.logout}
        />
        <Switch>
          {routes.map(({path, component:C, key}, i) => (
            <Route 
              exact path={path}
              render={(props) => <C {...props} userInfo={this.state.userInfo}/>}
              key={key}
            />
          ))}
        </Switch>
      </div>
    );
  }
  
  logout = () => {
    this.setState({
        userInfo: null
    })
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

  getLocation = () => {
    /*
    $.getJSON( '//ip-api.com/json?callback=?', function( data ) {
          console.log( JSON.stringify( data, null, 2 ) );
    });
    
    http://www.geoplugin.net/json.gp?ip=xx.xx.xx.xx
    */

    this.setState({
      latitude: 0,
      longitude: 0,
    });
    console.log(this.state.latitude);
    console.log(this.state.longitude);
  }
}

export default withRouter(App);