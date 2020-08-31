import React, { useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { get } from 'lodash/fp';
import {
  Avatar,
  Box,
  Button,
  Container,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../../shared/Copyright';
import api from '../../../api';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Login = (props) => {
  const { history } = props;
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const classes = useStyles();

  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleCloseAlert = () => {
    if (alertType === 'success') {
      history.push('/');
    } else {
      setOpenAlert(false);
    }
  };

  const handleSignIn = (data) => {
    api
      .signIn({
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        console.log(response);
        setOpenAlert(true);
        setAlertType('success');
        setAlertMessage('Login successful');

        const token = get('x-auth-token', response.headers);
        localStorage.setItem('token', token);
      })
      .catch((err) => {
        setOpenAlert(true);
        setAlertType('error');
        setAlertMessage('Invalid credentials');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(handleSignIn)} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            inputRef={register()}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register()}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={NavLink} to="signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
        <Alert severity={alertType}>{alertMessage}</Alert>
      </Snackbar>
    </Container>
  );
};

Login.propTypes = { history: PropTypes.objectOf(PropTypes.any) };

export default withRouter(Login);
