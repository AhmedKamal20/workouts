import React from 'react';
import { FirebaseContext } from '../clients/Firebase';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
  LinearProgress,
} from '@material-ui/core/';

import {
  Delete,
  VideoLibrary,
  ExpandMore,
} from '@material-ui/icons'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  table: {
    minWidth: 200,
    maxWidth: 700,
  },
});

class ListWorkOuts extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      expanded: false,
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

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    const { workouts } = this.state;
    return (
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12} md={6}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Body Parts</TableCell>
                  <TableCell align="right">Link</TableCell>
                  <TableCell align="right">Active?</TableCell>
                  <TableCell align="right">Delete</TableCell>
                  <TableCell align="right">More</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workouts.map(workout => (
                  <React.Fragment>
                  <TableRow key={workout.uid}>
                    <TableCell>
                      {workout.name}
                    </TableCell>
                    <TableCell align="right">{workout.bodyParts && workout.bodyParts.join(', ')}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="Link" color="primary" target="_blank" href={workout.link}>
                        <VideoLibrary />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <Checkbox disabled checked={workout.active} value="checkedE" />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="Delete" onClick={() => this.handleDelete(workout.uid)}>
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
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                      </TableCell>
                    </TableRow>
                  }
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
            {this.state.loading &&
              <LinearProgress color="secondary" />
            }
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

ListWorkOuts.propTypes = {
  classes: PropTypes.object.isRequired,
};

ListWorkOuts.contextType = FirebaseContext;

export default withStyles(styles)(ListWorkOuts);
