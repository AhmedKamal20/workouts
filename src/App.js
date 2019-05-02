import React from 'react';
import {  BrowserRouter as Router , Route, Switch } from "react-router-dom";

import Firebase, { FirebaseContext } from './clients/Firebase';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, blueGrey, green, blue, cyan } from '@material-ui/core/colors';

import TopBar from './components/TopBar';
import AddWorkOut from './components/AddWorkOut';
import ListWorkOuts from './components/ListWorkOuts';
import AddRoutine from './components/AddRoutine';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: cyan,
    error: red,
    action: green,
    background: {
      default: blueGrey['60'],
    }
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <FirebaseContext.Provider value={new Firebase()}>
            <Router>
              <TopBar />
              <Switch>
                <Route path="/" exact />
                <Route path="/workouts/new/" component={AddWorkOut} />
                <Route path="/workouts/" component={ListWorkOuts} />
                <Route path="/routines/new" component={AddRoutine} />
                <Route path="/routines/" component={AddRoutine} />
              </Switch>
            </Router>
          </FirebaseContext.Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
