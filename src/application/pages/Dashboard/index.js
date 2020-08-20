import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AppBar, Grid, IconButton, Toolbar, makeStyles } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ElevationScroll from '../../shared/ElevationScroll';
import Timeline from './Timeline';
import TimelineEntry from './TimelineEntry';
import api from '../../../api';

const useStyles = makeStyles((theme) => ({
  navigation: {
    bottom: '0px',
    top: 'inherit',
  },
}));

const Dashboard = (props) => {
  const classes = useStyles(props);

  const now = moment();
  const [meals, setMeals] = useState([]);
  const [date, setDate] = useState(now);
  const [title, setTitle] = useState('');

  const determineTitle = (date) => {
    if (moment().isSame(date, 'day')) {
      return 'Today';
    }
    if (moment().subtract(1, 'days').isSame(date, 'day')) {
      return 'Yesterday';
    }
    return date.format('dddd, MMMM Do YYYY');
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.meals(date);
      setMeals(result.data);
      setTitle(determineTitle(date));
    };

    fetchData();
  }, [date]);

  const navigate = (direction) => {
    const newDate = direction === 'next' ? date.add(1, 'd') : date.subtract(1, 'd');
    setDate(newDate.clone());
  };

  return (
    <>
      <h1>{title}</h1>
      <Timeline>
        {meals.map((meal) => (
          <TimelineEntry meal={meal} key={meal.id} />
        ))}
      </Timeline>
      <Toolbar />
      <ElevationScroll {...props}>
        <AppBar position="fixed" color="primary" className={classes.navigation}>
          <Toolbar>
            <Grid
              justify="space-between" // Add it here :)
              container
              spacing={24}
            >
              <Grid item>
                <IconButton edge="start" color="inherit" aria-label="previous" onClick={() => navigate('previous')}>
                  <NavigateBeforeIcon />
                </IconButton>
              </Grid>

              <Grid item>
                <IconButton edge="end" color="next" onClick={() => navigate('next')}>
                  <NavigateNextIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default Dashboard;
