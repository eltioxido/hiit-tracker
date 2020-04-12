import React from "react";
import TimerComponent from "./Timer";
import MaxOutComponent from "./MaxOutComponent";
import WorkoutPicker from "./WorkoutPicker";
import 'react-calendar/dist/Calendar.css';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

  return (
  <>
  <div className={classes.root}>
     <Grid container spacing={3}>
       <Grid item xs={12}>
         <Paper className={classes.paper}> <h4>Workout</h4> <WorkoutPicker /> </Paper>
       </Grid>
       <Grid item xs={6}>
         <Paper className={classes.paper}> <TimerComponent /> </Paper>
       </Grid>
       <Grid item xs={6}>
         <Paper className={classes.paper}> <MaxOutComponent /> </Paper>
       </Grid>

     </Grid>
    </div>
  </>
);
}

export default App;
