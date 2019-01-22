import React, { Component } from 'react';

import SingleComment from "../modules/SingleComment.js";

class ChatBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>ChatBox</div>
        <div>
          {this.props.comments.map(commentObj => (
            <SingleComment
              data={commentObj.comment}
              key={commentObj.comment._id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ChatBox;