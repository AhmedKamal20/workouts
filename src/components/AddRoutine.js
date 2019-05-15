import React from 'react';
import { FirebaseContext } from '../clients/Firebase';

import uuidv4 from '../libs/uuidv4';

import {
  Button,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Paper,
  Typography,
  Grid,
  Select,
  Checkbox,
  MenuItem,
  ListItemText,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';

import {
  FitnessCenter,
  Delete,
} from '@material-ui/icons';

const bodyParts = [
  'Chest',
  'Legs',
  'Back',
];

const initialState = {
    workouts: [],
    selectedWorkout: {
      workoutId: 0,
      sets: 0,
      reps: 0,
    },
    routine: {
      name: "",
      bodyParts: [],
      active: true,
      workouts: [],
    },
    loading: false
};


class AddRoutine extends React.Component {

  constructor() {
    super();
    this.state = initialState;
  };

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
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          workouts: [],
        });
      }
    });
  };

  componentWillUnmount() {
    const firebase = this.context;
    firebase.workouts().off();
  };

  handleChangeRoutineInfo = (event) => {
    let routine = {...this.state.routine}
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    routine[name] = value
    this.setState({routine});
  }

  handleSubmitRoutineInfo = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const firebase = this.context;
    firebase
      .routine(uuidv4())
      .set(this.state.routine).then(() => {
        this.setState(initialState);
      });
  }

  handleChangeSelectedWorkout = (event) => {
    let selectedWorkout = {...this.state.selectedWorkout}
    const target = event.target;
    const value = target.value;
    const name = target.name;
    selectedWorkout[name] = value
    this.setState({selectedWorkout});
  }

  handleSubmitSelectedWorkout = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    let routine = {...this.state.routine}
    routine.workouts = routine.workouts.concat(this.state.selectedWorkout)
    this.setState({routine: routine, loading: false});
  }

  handleDeleteWorkout = (workout, event) => {
    event.preventDefault();
    this.setState({loading: true});
    let routine = {...this.state.routine}
    routine.workouts = routine.workouts.filter(i => i.workoutId !== workout.workoutId)
    this.setState({routine: routine, loading: false});
  }

  render() {
    const { routine, workouts, selectedWorkout, loading } = this.state;
    return(
      <Grid container
        spacing={16}
      >
        <Grid item xs={12} md={6}>
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
                  autoFocus
                  onChange={this.handleChangeRoutineInfo}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="bodyParts">Body Parts</InputLabel>
                <Select
                  multiple
                  name="bodyParts"
                  value={routine.bodyParts}
                  onChange={this.handleChangeRoutineInfo}
                  input={<Input id="bodyParts" />}
                  renderValue={selected => selected.join(', ')}
                >
                  {bodyParts.map(bodyPart => (
                    <MenuItem key={bodyPart} value={bodyPart}>
                      <Checkbox color="primary" checked={routine.bodyParts.indexOf(bodyPart) > -1} />
                      <ListItemText primary={bodyPart} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={<Checkbox
                           name="active"
                           value="active"
                           checked={routine.active}
                           color="primary"
                           onChange={this.handleChangeRoutineInfo}
                         />}
                label="Active?"
              />
              <Paper style={{padding: 15, margin: 15}}>
                <Typography variant="h6">
                  Routine Workouts
                </Typography>
                <div>
                  <List dense={false}>
                    {this.state.routine.workouts.map(workout =>
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
                        <ListItemSecondaryAction>
                          <IconButton
                            aria-label="Delete"
                            onClick={this.handleDeleteWorkout.bind(this, workout)}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )}
                  </List>
                </div>
              </Paper>
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
        <Grid item xs={12} md={6}>
          <Paper style={{padding: 15, margin: 15}}>
            <Typography component="h1" variant="h5">
              All Workouts
            </Typography>
            <form onSubmit={this.handleSubmitSelectedWorkout}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="workoutId">Workouts</InputLabel>
                <Select
                  value={selectedWorkout.workoutId}
                  onChange={this.handleChangeSelectedWorkout}
                  inputProps={{
                    name: 'workoutId',
                    id: 'workoutId',
                  }}
                >
                  {workouts.map(workout => (
                    <MenuItem key={workout.uid} value={workout.uid}>
                      {workout.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="sets">Sets</InputLabel>
                <Input
                  id="sets"
                  name="sets"
                  value={selectedWorkout.sets}
                  onChange={this.handleChangeSelectedWorkout}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="reps">Reps</InputLabel>
                <Input
                  id="reps"
                  name="reps"
                  value={selectedWorkout.reps}
                  onChange={this.handleChangeSelectedWorkout}
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color={loading ? "secondary" : "primary"}
              >
                {loading ? <CircularProgress color="inherit" size={24} /> : "Add"}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

AddRoutine.contextType = FirebaseContext;

export default AddRoutine;
