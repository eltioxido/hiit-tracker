import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import TimerComponent from "./Timer";
import MaxOutComponent from "./MaxOutComponent";
import WorkoutPicker from "./WorkoutPicker";
import HorizontalLabelPositionBelowStepper from "./StepsMain";
import 'react-calendar/dist/Calendar.css';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import NavBar from "./NavBar";
import Profile from "./Profile";
import BottomNavigationComponent from "./BottomNavigation";
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
  const workoutConfigSet = useSelector(state => state.workoutConfigSet);
  const insertedWorkout = useSelector(state => state.insertedWorkout);
  const message = useSelector(state => state.message);
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
     <Grid container className={classes.paper}>
       <Grid item xs={12}>                     </Grid>
       { !workoutConfigSet ?
         <Grid item xs={12}> <HorizontalLabelPositionBelowStepper />   </Grid> :
         <>
         {!insertedWorkout ?
           <>
           <Grid item xs={12}>  <TimerComponent />  </Grid>
           <Grid item xs={12}>  <MaxOutComponent /> </Grid>
           </>
           :
           <h2>{message}</h2>
         }
         </>
       }

       <BottomNavigationComponent />
     </Grid>
    </div>

  </>
);
}

export default App;
