import React from 'react';
import moment from 'moment-timezone';
import { Card, CardContent, CardHeader, IconButton, SvgIcon, Typography, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
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
  head: {
    padding: '16px 16px 0px 16px',
  },
  content: {
    padding: '0px 16px',
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
        <CardHeader
          className={classes.head}
          action={
            <IconButton aria-label="settings">
              <DeleteIcon color="primary" />
            </IconButton>
          }
          titleTypographyProps={{ variant: 'body' }}
          title={meal.what}
        />
        <CardContent className={classes.content}>
          <hr color="white" />
          <Typography variant="caption">
            {meal.type} | {moment(meal.when).format('hh:mm:ss')} | {meal.location}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

TimelineEntry.propTypes = { meal: PropTypes.objectOf(PropTypes.any) };

export default TimelineEntry;
