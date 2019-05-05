import React from 'react';
import { FirebaseContext } from '../clients/Firebase';

import uuidv4 from '../libs/uuidv4';

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import { FitnessCenter, Delete } from '@material-ui/icons';

const initialState = {
    workouts: [],
    routines: [],
    loading: false
};


class AddRoutine extends React.Component {

  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    this.setState({ loading: true });
    const firebase = this.context;

    firebase.workouts().on('value', snapshot => {
      if (snapshot.exists()) {
        const workoutsObject = snapshot.val();
        const workoutsList = Object.keys(workoutsObject).map(key => ({
          ...workoutsObject[key],
          uid: key,
        }));
        this.setState({
          workouts: workoutsList,
        });
      } else {
        this.setState({
          workouts: [],
        });
      }
    });

    firebase.routines().on('value', snapshot => {
      if (snapshot.exists()) {
        const routinesObject = snapshot.val();
        const routinesList = Object.keys(routinesObject).map(key => ({
          ...routinesObject[key],
          uid: key,
        }));
        this.setState({
          routines: routinesList,
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          routines: [],
        });
      }
    });
  }

  componentWillUnmount() {
    const firebase = this.context;
    firebase.workouts().off();
    firebase.routines().off();
  }

  render() {
    const { routines, workouts, loading } = this.state;
    return(
      <Grid container
        spacing={16}
      >
        <Grid item xs={12} md={6}>
          {this.state.routines.map(routine =>
            <Paper style={{padding: 15, margin: 15}}>
              <Typography component="h1" variant="h5">
                Routine Info
              </Typography>
              <form onSubmit={this.handleSubmitRoutineInfo}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input
                    id="name"
                    name="name"
                    value={routine.name}
                    readOnly
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="bodyParts">Body Parts</InputLabel>
                  <Select
                    multiple
                    name="bodyParts"
                    value={routine.bodyParts}
                    readOnly
                    input={<Input id="bodyParts" />}
                    renderValue={selected => selected.join(', ')}
                  >
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={<Checkbox
                             name="active"
                             value="active"
                             checked={routine.active}
                             readOnly
                             color="primary"
                           />}
                  label="Active?"
                />
              </form>
              <Typography variant="h6">
                Routine Workouts
              </Typography>
              <div>
                <List dense={false}>
                  {routine.workouts.map(workout =>
                    <ListItem key={workout.workoutId}>
                      <ListItemAvatar>
                        <Avatar>
                          <FitnessCenter />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={workouts.filter(w => w.uid === workout.workoutId )[0].name}
                        secondary={workout.sets + ' sets of ' + workout.reps + ' reps' }
                      />
                    </ListItem>
                  )}
                </List>
              </div>
            </Paper>
          )}
        </Grid>
      </Grid>
    )
  }
}

AddRoutine.contextType = FirebaseContext;

export default AddRoutine;
