import React, { Component } from 'react';

class NewComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  render() {
    return (
      <div>
        <div>NewComment</div>
        <form>
          <input 
            type="text" 
            placeholder="Write a comment" 
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
        <div>
          <button
            type="submit"
            value="Submit"
            onClick={this.handleSubmit}
          >Submit</button>
        </div>
      </div>
    );
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addComment(this.state.value);
    this.setState({value: ''});
  }
}

export default NewComment;