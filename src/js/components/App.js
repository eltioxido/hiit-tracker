import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import TimerComponent from "./Timer";
import MaxOutComponent from "./MaxOutComponent";
import WorkoutPicker from "./WorkoutPicker";
import HorizontalLabelPositionBelowStepper from "./StepsMain";
import 'react-calendar/dist/Calendar.css';
import WakeLock from 'react-wakelock-react16';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import NavBar from "./NavBar";
import Profile from "./Profile";
import BottomNavigationComponent from "./BottomNavigation";
import history from "../utils/history";
import { useAuth0 } from "../react-auth0-spa";
import PrivateRoute from "./PrivateRoute";
import ListComponent from "./WorkoutsList";
import Button from '@material-ui/core/Button';

import { useDispatch, useSelector } from "react-redux";
import { setUser, setHome, setToken } from "../actions/index";



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
  const onHomePage = useSelector(state => state.onHomePage);
  const { loading, user, getTokenSilently } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
  else {
    dispatch(setUser(user))
  }

  return (
  <>
  <div className={classes.root}>
    <WakeLock />
     <Grid container className={classes.paper}>
      <Grid item xs={12}>                     </Grid>
      {onHomePage?

        <Grid item xs={12}>  <ListComponent />  </Grid>
        :
        <>
         { !workoutConfigSet ?
           <Grid item xs={12}> <HorizontalLabelPositionBelowStepper />   </Grid> :
           <>
           {!insertedWorkout ?
             <>
             <Grid item xs={12}>  <TimerComponent />  </Grid>
             <Grid item xs={12}>  <MaxOutComponent /> </Grid>
             </>
             :
              null
           }
           </>
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
