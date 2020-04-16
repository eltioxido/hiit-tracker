import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import TimerComponent from "./Timer";
import MaxOutComponent from "./MaxOutComponent";
import WorkoutPicker from "./WorkoutPicker";
import 'react-calendar/dist/Calendar.css';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import NavBar from "./NavBar";
import Profile from "./Profile";
import history from "../utils/history";
import { useAuth0 } from "../react-auth0-spa";
import PrivateRoute from "./PrivateRoute";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../actions/index";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { loading, user } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
  else {
    dispatch(setUser(user))
  }

  return (
  <>
  <div className={classes.root}>
    <Router history={history}>
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route path="/" exact />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    </Router>
     <Grid container spacing={3} className={classes.paper}>
       <Grid item xs={12}>                     </Grid>
       <Grid item xs={12}> <WorkoutPicker />   </Grid>
       <Grid item xs={6}>  <TimerComponent />  </Grid>
       <Grid item xs={6}>  <MaxOutComponent /> </Grid>
     </Grid>
    </div>
  </>
);
}

export default App;
