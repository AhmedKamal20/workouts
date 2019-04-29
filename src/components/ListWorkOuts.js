import React from 'react';
import { FirebaseContext } from '../clients/Firebase';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 16,
    maxWidth: 500,
  },
});

class ListWorkOuts extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const firebase = this.context;

    firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container spacing={16}>
              {this.state.users.map(value => (
                <Grid key={value.uid} item>
                  <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                      {value.email}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
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
