import React from 'react';
import { FirebaseContext } from '../clients/Firebase';

import {
  Avatar,
  Checkbox,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core/';

import {
  FitnessCenter,
  Delete,
  ExpandMore,
} from '@material-ui/icons';

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

  getWorkoutName = (workoutId) => {
    const { workouts } = this.state;
    try {
      return workouts.filter(w => w.uid === workoutId )[0].name
    } catch(e) {
      return ""
    }
  }

  handleDelete = (uid) => {
    const firebase = this.context;
    if (uid) {
      firebase.routine(uid).remove();
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { routines, loading } = this.state;
    return(
      <Grid container
        spacing={16}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12} md={6}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Body Parts</TableCell>
                  <TableCell align="right">Active?</TableCell>
                  <TableCell align="right">Delete</TableCell>
                  <TableCell align="right">More</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {routines.map(routine => (
                  <React.Fragment key={routine.uid}>
                  <TableRow>
                    <TableCell>
                      {routine.name}
                    </TableCell>
                    <TableCell align="right">{routine.bodyParts && routine.bodyParts.join(', ')}</TableCell>
                    <TableCell align="right">
                      <Checkbox disabled checked={routine.active} value="checkedE" />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="Delete" onClick={() => this.handleDelete(routine.uid)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={this.handleExpandClick.bind(this)}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                      >
                        <ExpandMore />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  { this.state.expanded &&
                    <TableRow>
                      <TableCell align="left" colSpan={6}>
                        <List dense={false}>
                          {routine.workouts.map(workout =>
                            <ListItem key={workout.workoutId}>
                              <ListItemAvatar>
                                <Avatar>
                                  <FitnessCenter />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={this.getWorkoutName(workout.workoutId)}
                                secondary={workout.sets + ' sets of ' + workout.reps + ' reps' }
                              />
                            </ListItem>
                          )}
                        </List>
                      </TableCell>
                    </TableRow>
                  }
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
            {loading &&
              <LinearProgress color="secondary" />
            }
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

AddRoutine.contextType = FirebaseContext;

export default AddRoutine;
