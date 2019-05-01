import React from 'react';
import { FirebaseContext } from '../clients/Firebase';

import uuidv4 from '../libs/uuidv4';

import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

const bodyParts = [
  'Chest',
  'Legs',
  'Back',
];

const initialState = {workout: {name: "", bodyParts: [], active: true}, loading: false};

class AddWorkOut extends React.Component {

  constructor() {
    super();
    this.state = initialState;
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
    this.setState({loading: true});
    event.preventDefault();
    const firebase = this.context;
    firebase
      .workout(uuidv4())
      .set(this.state.workout).then(() => {
        this.setState(initialState);
      });
  }

  render() {
    const { workout, loading } = this.state;
    return(
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={3}>
          <Paper style={{padding: 15}}>
            <Typography component="h1" variant="h5">
              WorkOut Info
            </Typography>
            <form onSubmit={this.handleSubmit} id="hello">
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  name="name"
                  value={workout.name}
                  autoFocus
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="bodyParts">Body Parts</InputLabel>
                <Select
                  multiple
                  name="bodyParts"
                  value={workout.bodyParts}
                  onChange={this.handleChange}
                  input={<Input id="bodyParts" />}
                  renderValue={selected => selected.join(', ')}
                >
                  {bodyParts.map(bodyPart => (
                    <MenuItem key={bodyPart} value={bodyPart}>
                      <Checkbox color="primary" checked={workout.bodyParts.indexOf(bodyPart) > -1} />
                      <ListItemText primary={bodyPart} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={<Checkbox
                           name="active"
                           value="active"
                           checked={workout.active}
                           color="primary"
                           onChange={this.handleChange}
                         />}
                label="Active?"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color={loading ? "secondary" : "primary"}
              >
                {loading ? <CircularProgress color="inherit" size={24} /> : "Submit"}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

AddWorkOut.contextType = FirebaseContext;

export default AddWorkOut;
