import React from 'react';
import moment from 'moment-timezone';
import { Card, CardContent, SvgIcon, Typography, makeStyles } from '@material-ui/core';
import { mdiGlassPintOutline, mdiBreadSliceOutline, mdiFoodAppleOutline, mdiRice } from '@mdi/js';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  timelineEntry: {
    position: 'relative',
    margin: '2em 0',
  },
  timelineEntryIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '40px',
    height: '40px',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    borderRadius: '50%',
  },
  timelineEntryContent: {
    position: 'relative',
    marginLeft: '60px',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  svg: {
    position: 'relative',
    width: '24px',
    height: '24px',
    marginLeft: '-12px',
    marginTop: '-12px',
    left: '50%',
    top: '50%',
    display: 'block',
  },
  captionSvg: {
    top: '4%',
    height: '16px',
    width: '16px',
    position: 'relative',
  },
}));

const TimelineEntry = (props) => {
  const { meal } = props;
  const classes = useStyles(props);
  let icon;

  switch (meal.type) {
    case 'breakfast':
      icon = mdiBreadSliceOutline;
      break;
    case 'drink':
      icon = mdiGlassPintOutline;
      break;
    case 'snack':
      icon = mdiFoodAppleOutline;
      break;
    default:
      icon = mdiRice;
  }

  return (
    <div className={classes.timelineEntry}>
      <span className={classes.timelineEntryIcon}>
        <SvgIcon className={classes.svg}>
          <path d={icon} />
        </SvgIcon>
      </span>
      <Card className={classes.timelineEntryContent}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            {meal.what}
          </Typography>

          <hr color="white" />
          <Typography variant="caption" gutterBottom>
            {meal.type} | {moment(meal.when).format('hh:mm:ss')} | {meal.location}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

TimelineEntry.propTypes = { meal: PropTypes.objectOf(PropTypes.any) };

export default TimelineEntry;
