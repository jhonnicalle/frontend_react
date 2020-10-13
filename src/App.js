import React from 'react';

import ListUsers from './components/Users/ListUsers/'

import {useStyles} from './App.styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            API Users
          </Typography>
        </Toolbar>
      </AppBar>
      <ListUsers />
    </div>
  );    
}

export default App;
