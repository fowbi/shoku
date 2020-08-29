import React, { useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Register = (props) => {
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

  const handleSignUp = (data) => {
    console.log(data);
    api
      .signUp({
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then(() => {
        setOpenAlert(true);
        setAlertType('success');
        setAlertMessage('Registration was successful, in 5 seconds you will be redirected to the login page');
      })
      .catch((err) => {
        setOpenAlert(true);
        setAlertType('error');
        setAlertMessage(`Registration was not successful: ${err} \nPlease try again.`);
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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(handleSignUp)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="uname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                inputRef={register()}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                key="email"
                autoComplete="email"
                inputRef={register()}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                key="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register()}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={NavLink} to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert severity={alertType}>{alertMessage}</Alert>
      </Snackbar>
    </Container>
  );
};

Register.propTypes = { history: PropTypes.objectOf(PropTypes.any) };

export default withRouter(Register);
