import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import { useHttp, IUseHttpp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext, IAuthContext } from '../context/auth.context';

interface Props {}

const useStyles = makeStyles({
  // root: {
  //   '& .MuiTextField-root': {
  //     margin: theme.spacing(1),
  //     width: 200,
  //   },
  // },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface IForm {
  email: string;
  password: string;
}

export const AuthPage: React.FC<Props> = () => {
  const classes = useStyles();

  const message = useMessage();

  const auth: IAuthContext = useContext(AuthContext);

  const { loading, request, error, clearError }: IUseHttpp = useHttp();

  const [form, setForm] = useState<IForm>({ email: '', password: '' });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const authHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);

      if (data.message === 'user created') {
        authHandler();
      }
    } catch (error) {}
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom></Typography>
            <Typography variant='h5' component='h2'>
              Authorization
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container>
              <Grid container>
                <TextField
                  required
                  name='email'
                  type='email'
                  placeholder='email'
                  id='standard-required'
                  label='email'
                  onChange={changeHandler}
                  value={form.email}
                />
              </Grid>
              <Grid container>
                <TextField
                  required
                  name='password'
                  placeholder='password'
                  id='standard-password-input'
                  label='password'
                  type='password'
                  autoComplete='current-password'
                  value={form.password}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={2}>
                  <Button size='small' onClick={authHandler} disabled={loading}>
                    Login
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    size='small'
                    onClick={registerHandler}
                    disabled={loading}>
                    Registrate
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
