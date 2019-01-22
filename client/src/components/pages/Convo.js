import React, { Component } from 'react';
import io from 'socket.io-client';

import ChatBox from "../modules/ChatBox";
import NewComment from "../modules/NewComment";

class Convo extends Component {
  constructor(props) {
    super(props);

    this.socket = io('http://localhost:3000');

    this.state = {
      name: null,
      id: null,
      comments: []
    }

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.socket.on('comment', (commentObj) => { if (this._isMounted) {
      this.setState({
        comments: (this.state.comments).concat({comment: commentObj})
      });}
    });
    this.getConvo(this.props.match.params.convoId);
    this.getComments(this.props.match.params.convoId);
    document.title = "Convo Page";
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const isLoggedIn = this.props.userInfo !== null;
    return (
      <div>
        <div>Convo</div>
        {this.state.name}
        <ChatBox
          comments = {this.state.comments}
        />
        <div>
          {isLoggedIn ? (
            <NewComment
              addComment = {this.addComment}
            />
          ) : (
            <div>You must be logged in to comment</div>
          )}
        </div>
      </div>
    );
  }

  getConvo = (convo_id) => {
    fetch("/api/convo?_id=" + convo_id)
      .then(res => res.json())
      .then(
        convoObj => {
          this.setState({
            name: convoObj.convo_name,
            id: convo_id,
          });
        }
      )
  }

  getComments = (convo_id) => {
    fetch("/api/comment?convo_id=" + convo_id)
      .then(res => res.json())
      .then(commentObjs => 
        commentObjs.map((commentObj) => {
          this.setState({
            comments: (this.state.comments).concat({comment: commentObj})
          })
        })
      );
  }
 
  addComment = (content) => {
    const body = {'convo_id': this.state.id, 'content': content};
    fetch('/api/comment', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(body)
    });
  }
}

export default Convo;