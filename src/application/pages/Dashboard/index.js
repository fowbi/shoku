import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { AppBar, Fab, Grid, IconButton, Toolbar, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ElevationScroll from '../../shared/ElevationScroll';
import Timeline from './Timeline';
import TimelineEntry from './TimelineEntry';
import AddMealDialog from './AddMealDialog';
import DeleteMealDialog from './DeleteMealDialog';
import api from '../../../api';

const useStyles = makeStyles((theme) => ({
  navigation: {
    bottom: '0px',
    top: 'inherit',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

const Dashboard = (props) => {
  const classes = useStyles(props);

  const now = moment();
  const [meals, setMeals] = useState([]);
  const [date, setDate] = useState(now);
  const [title, setTitle] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteUuid, setDeleteUuid] = useState(null);

  const determineTitle = (date) => {
    if (moment().isSame(date, 'day')) {
      return 'Today';
    }
    if (moment().subtract(1, 'days').isSame(date, 'day')) {
      return 'Yesterday';
    }
    return date.format('dddd, MMMM Do YYYY');
  };

  const isInFuture = () => date.isSameOrAfter(moment(), 'day');

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

  const addMeal = () => {
    setOpenAddDialog(true);
  };

  const deleteMeal = (id) => {
    setDeleteUuid(id);
    setOpenDeleteDialog(true);
  };

  const addMealSuccess = () => {
    setOpenAddDialog(false);
    setDate(moment().clone());
  };

  const deleteMealSuccess = () => {
    setOpenDeleteDialog(false);
    setDate(moment().clone());
  };

  return (
    <>
      <h1>{title}</h1>
      <Timeline>
        {meals.map((meal) => (
          <TimelineEntry meal={meal} key={meal.id} deleteMealAction={() => deleteMeal(meal.id)} />
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
                <IconButton edge="start" color="secondary" aria-label="previous" onClick={() => navigate('previous')}>
                  <NavigateBeforeIcon />
                </IconButton>
              </Grid>
              <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={() => addMeal()}>
                <AddIcon />
              </Fab>

              {!isInFuture() && (
                <Grid item>
                  <IconButton edge="end" color="secondary" aria-label="next" onClick={() => navigate('next')}>
                    <NavigateNextIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <AddMealDialog
        date={date}
        handleClose={() => setOpenAddDialog(false)}
        open={openAddDialog}
        onSuccess={addMealSuccess}
      />
      <DeleteMealDialog
        id={deleteUuid}
        message="delete message"
        handleClose={() => setOpenDeleteDialog(false)}
        open={openDeleteDialog}
        onSuccess={deleteMealSuccess}
      />
    </>
  );
};

export default Dashboard;
