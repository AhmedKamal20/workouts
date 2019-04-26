import React from 'react';
import { FirebaseContext } from './Firebase';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import { Home } from '@material-ui/icons'

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
      <div>
        <AppBar color="primary" position="static">
          <Toolbar>
            <Home />
            <TypoGraphy variant="title"
              color="inherit"
            >
              WorkOuts
           </TypoGraphy>
          </Toolbar>
        </AppBar>

      </div>
    );
  }
}

App.contextType = FirebaseContext;

export default App;
