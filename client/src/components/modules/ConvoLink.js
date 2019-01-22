import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ConvoLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>ConvoLink</div>
        <Link to={"/convo/" + this.props.convoInfo._id}>
          {this.props.convoInfo.convo_name}
        </Link>
      </div>
    );
  }
}

export default ConvoLink;