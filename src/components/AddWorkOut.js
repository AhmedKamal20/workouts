import React from 'react';
import { FirebaseContext } from '../clients/Firebase';
import uuidv4 from '../libs/uuidv4';

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';

import { Search } from '@material-ui/icons'

class AddWorkOut extends React.Component {

  constructor() {
    super();
    this.state = {workout: {}};
  }

  handleChange = (event) => {
    let workout = {...this.state.workout}
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    workout[name] = value
    this.setState({workout});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const firebase = this.context;
    firebase
      .workout(uuidv4())
      .set(this.state.workout);
  }

  render() {
    return(
      <Grid item xs={12}>
        <Grid container justify="center" spacing={16}>
          <Grid item>
            <Paper style={{padding: 15}}>
              <Avatar>
                <Search />
              </Avatar>
              <Typography component="h1" variant="h5">
                Fill In
              </Typography>
              <form onSubmit={this.handleSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox
                             name="remember"
                             value="remember"
                             color="primary"
                             onChange={this.handleChange}
                           />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

    )
  }
}

AddWorkOut.contextType = FirebaseContext;

export default AddWorkOut;
