import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import { IoIosLogIn } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

import { useAuth0 } from "../react-auth0-spa";

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});


export default function BottomNavigationComponent() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function onClickHandler()
  {
    if(!isAuthenticated)    loginWithRedirect();
    else                    logout()
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction onClick={() => onClickHandler({})} label={!isAuthenticated ? "Log in" : "Log out"} icon={!isAuthenticated ? <IoIosLogIn size="1.6em" /> : <IoIosLogOut size="1.6em"/>} />
    </BottomNavigation>
  );
}
