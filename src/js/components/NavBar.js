import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  function onClickHandler()
  {
    if(!isAuthenticated)    loginWithRedirect();
    else                    logout()
  }

  const classes = useStyles();

  return (
    <div>

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Workout
          </Typography>
          <Button
            color="inherit"
            onClick={() => onClickHandler({})}
            >
              {!isAuthenticated ? "Log in" : "Log out" }
          </Button>
        </Toolbar>
      </AppBar>
      {false  && (
        <span>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/profile">Profile</Link>
        </span>
      )}


    </div>

  );
};

export default NavBar;
