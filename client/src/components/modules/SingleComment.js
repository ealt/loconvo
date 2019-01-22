import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SingleComment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>SingleComment</div>
        <Link to={"/profile/" + this.props.data.creator_id}>
          {this.props.data.creator_name}
        </Link>
        <div>
          {this.props.data.content}
        </div>
      </div>
    );
  }
}

export default SingleComment;