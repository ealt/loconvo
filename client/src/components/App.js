import React from "react";
import "../css/app.css";

import { Route, Switch, withRouter } from 'react-router-dom';

import NavBar from "./modules/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Conversations from "./pages/Conversations";
import LocalMap from "./pages/LocalMap";
//import { runInThisContext } from "vm";

const routes = [
  {
    path: "/",
    component: Home,
    key: "home"
  },
  {
    path: "/profile/:user",
    component: Profile,
    key: "profile"
  },
  {
    path: "/conversations",
    component: Conversations,
    key: "conversations"
  },
  {
    path: "/map",
    component: LocalMap,
    key: "map"
  }
]

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: null
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
}

export default withRouter(App);