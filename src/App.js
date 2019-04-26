import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FirebaseContext } from './Firebase';

class App extends React.Component {

  componentDidMount() {
    const firebase = this.context;
    firebase
      .user("ASAS90")
      .set({
        username: "aKamal",
        email: "aKamal@example.com",
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

App.contextType = FirebaseContext;

export default App;
