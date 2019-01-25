import React, { Component } from 'react';
import io from 'socket.io-client';

import NewConvo from '../modules/NewConvo';
import ConvoLink from '../modules/ConvoLink';

class Conversations extends Component {
  constructor(props) {
    super(props);

    this.socket = io(process.env.PORT ? undefined : 'http://localhost:3000');

    this.state = {
      isLoggedIn: this.props.userInfo !== null,
      hasLocation: this.props.userInfo !== null && this.props.userInfo.latitude !== null && this.props.userInfo.longitude !== null,
      sortByLocation: true,
      convos: [],
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.state.hasLocation) {
      this.socket.on('convo', (convoObj) => { if (this._isMounted) {
        const dist = this.getDist(convoObj);
        const weight = this.getWeight(convoObj, dist);
        this.setState({
          convos: [{
            convo: convoObj,
            dist: dist,
            weight: weight,
          }].concat(this.state.convos)
        });}
      });
      this.getConvos();
    }
    document.title = "Local Conversations"
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    this.state.sortByLocation ?
      this.state.convos.sort((a, b) => a.weight - b.weight)
    :
      this.state.convos.sort((a, b) => a.createdAt - b.createdAt)
    ;
    return (
      <div>
        <div>Conversations</div>
        {this.state.isLoggedIn ? (
          <div>
              {this.state.hasLocation ? (
                <div>
                  <div>
                    <div>You have a location</div>
                    <div>latitude: {this.props.userInfo.latitude}</div>
                    <div>longitude: {this.props.userInfo.longitude}</div>
                  </div>
                  <NewConvo addConvo = {this.addConvo}/>
                </div>
              ) : (
                <div>
                  You must have a location to view conversations
                </div>
              )}

              {this.state.convos ? (
                <div>
                {this.state.convos.map(convoObj => (
                 <ConvoLink 
                    convoInfo={convoObj.convo}
                    dist={convoObj.dist}
                    key={convoObj.convo._id}
                  />
                ))}
                </div>
              ) : (
                <div>Be the first one to start a conversation!</div>
              )}
            </div>
          ) : (
            <div>You must be logged in to create a conversation</div>
          )}
        </div>
      );
  }

  getConvos = () => {
    fetch('/api/convo')
      .then(res => res.json())
      .then(convoObjs => 
        convoObjs.reverse().map((convoObj) => {
          this.checkDist(convoObj);
        }));
  }

  checkDist = (convoObj) => {
    const dist = this.getDist(convoObj);
    const weight = this.getWeight(convoObj, dist);
    if (dist < convoObj.radius) {
      this.setState({
        convos: (this.state.convos).concat({
          convo: convoObj,
          dist: dist,
          weight: weight,
        })
      })
    }
  }

  getDist = (convoObj) => {
    const dy = convoObj.latitude  - this.props.userInfo.latitude;
    const dx = convoObj.longitude - this.props.userInfo.longitude;
    return (Math.sqrt((dx * dx) + (dy * dy)));
  }

  getWeight = (convoObj, dist) => {
    return dist;
  }

  addConvo = (newConvo) => {
    const body = {
      'convo_name': newConvo.name,
      'latitude': this.props.userInfo.latitude,
      'longitude': this.props.userInfo.longitude,
      'radius': newConvo.radius,
    };
    console.log("addConvo");
    console.log(this.props.userInfo.latitude);
    console.log(this.props.userInfo.longitude);
    fetch('/api/convo', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(body),
    });
  }
}

export default Conversations;