import React, { Component } from 'react';
import io from 'socket.io-client';

import NewConvo from '../modules/NewConvo';
import ConvoLink from '../modules/ConvoLink';

class Conversations extends Component {
  constructor(props) {
    super(props);

    this.socket = io('http://localhost:3000');

    this.state = {
      convos: [],
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.socket.on('convo', (convoObj) => { if (this._isMounted) {
      this.setState({
        convos: [{convo: convoObj}].concat(this.state.convos)
      });}
    });
    this.getConvos();
    document.title = "Local Conversations"
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const isLoggedIn = this.props.userInfo !== null;
    return (
      <div>
        <div>Conversations</div>
        {isLoggedIn ? (
          <NewConvo
            addConvo = {this.addConvo}
          />
        ) : (
          <div>
            You must be logged in to create a conversation
          </div>
        )}
        <div>
          {this.state.convos ? (
            this.state.convos.map(convoObj => (
              <ConvoLink 
                convoInfo={convoObj.convo}
                key={convoObj.convo._id}
              />
            ))
          ) : (
            <div>Be the first one to start a conversation!</div>
          )}
        </div>
      </div>
    );
  }

  getConvos = () => {
    fetch('/api/convo')
      .then(res => res.json())
      .then(convoObjs => 
        convoObjs.reverse().map((convoObj) => {
          this.setState({
            convos: (this.state.convos).concat({convo: convoObj})
          })
        })
      );
  }

  addConvo = (convo_name) => {
    const body = {'convo_name': convo_name};
    fetch('/api/convo', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(body)
    });
  }
}

export default Conversations;