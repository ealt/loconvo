import React, { Component } from 'react';

class NewConvo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      radius: 0.5,
    };
  }

  render() {
    return (
      <div>
        <div>NewConvo</div>
        <form>
          <input 
            type="text" 
            placeholder="Create a new conversation" 
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <input 
            type="number" 
            placeholder="Choose a radius" 
            value={this.state.radius}
            onChange={this.handleRadiusChange}
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

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  handleRadiusChange = (event) => {
    this.setState({radius: event.target.value});
  }

  handleSubmit = (event) => {
    //event.preventDefault();
    const hasInput = (this.state.name !== '' && this.state.radius);
    hasInput ?
      this.createConvo()
    :
      alert("New conversations need a name and radius")
    ;
  }

  createConvo = () => {
    this.props.addConvo(this.state);
    this.setState({name: ''});
    this.setState({radius: 0.5});
  }
}

export default NewConvo;