import React, { useContext } from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { AuthContext, IAuthContext } from '../context/auth.context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

interface Props {}

export const Navbar: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();

  const auth: IAuthContext = useContext(AuthContext);

  const logoutHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'>
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' className={classes.title}>
            <Link to={'/create'}>Create </Link>
          </Typography>

          <Typography variant='h6' className={classes.title}>
            <NavLink to={'/links'}>Links</NavLink>
          </Typography>

          <Button onClick={logoutHandler} color='inherit'>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
