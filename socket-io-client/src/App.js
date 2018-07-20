import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: 'http://127.0.0.1:4001'
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('FromAPI', data => this.setState({ response: data }));
  }

  render() {
    const { response } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React and Socket.IO</h1>
        </header>
        <div className="container">
          <div className="Card">
            {response 
              ? <p>
                The temperature in Florence is: {response}°F
                </p> 
              : <p>Loading...</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
