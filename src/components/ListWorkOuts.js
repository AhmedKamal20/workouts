import React from 'react';
import { FirebaseContext } from '../clients/Firebase';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'

import { Delete } from '@material-ui/icons'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class ListWorkOuts extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      workouts: [],
    };
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
          loading: false,
        });
      } else {
        this.setState({
          loading: false,
          workouts: [],
        });
      }
    });
  }

  componentWillUnmount() {
    const firebase = this.context;
    firebase.workouts().off();
  }

  handleDelete = (uid) => {
    const firebase = this.context;
    if (uid) {
      firebase.workout(uid).remove();
    }
  }

  render() {
    const { classes } = this.props;
    const { workouts } = this.state;
    return (
      <div>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
      <Grid item xs={10}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Body Parts</TableCell>
                <TableCell align="right">Active?</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workouts.map(workout => (
                <TableRow key={workout.uid}>
                  <TableCell component="th" scope="row">
                    {workout.name}
                  </TableCell>
                  <TableCell align="right">{workout.bodyParts && workout.bodyParts.join(', ')}</TableCell>
                  <TableCell align="right">
                    <Checkbox disabled checked={workout.active} value="checkedE" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="Delete" hamda="ajs" onClick={() => this.handleDelete(workout.uid)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {this.state.loading &&
            <LinearProgress color="secondary" />
          }
        </Paper>
      </Grid>
      </Grid>
      </div>
    );
  }
}

ListWorkOuts.propTypes = {
  classes: PropTypes.object.isRequired,
};

ListWorkOuts.contextType = FirebaseContext;

export default withStyles(styles)(ListWorkOuts);
