import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { List, Add, AccountCircle, Menu } from '@material-ui/icons'
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    display: 'inline-flex',
    verticalAlign: 'middle',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class TopBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <Menu />
            </IconButton>
            <Typography variant="h6"
              color="inherit"
            >
              WorkOuts
            </Typography>
            <div className={classes.grow} />
            <Link to="/workouts/new/">
              <Button variant="outlined" size="small" className={classes.button}>
                <Add className={classes.leftIcon} />
                Add New
              </Button>
            </Link>
            <Link to="/workouts/">
              <Button variant="outlined" size="small" className={classes.button}>
                <List className={classes.leftIcon} />
                List All
              </Button>
            </Link>
            <Link to="/routines/new">
              <Button variant="outlined" size="small" className={classes.button}>
                <List className={classes.leftIcon} />
                New
              </Button>
            </Link>
            <div className={classes.grow} />
            <IconButton styles={{display: 'flex'}}>
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);
