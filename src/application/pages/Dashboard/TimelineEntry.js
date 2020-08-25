import React, { useState } from 'react';
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
    zIndex: 1001,
  },
  good: {
    backgroundColor: 'green !important',
  },
  meh: {
    backgroundColor: 'orange !important',
  },
  bad: {
    backgroundColor: 'red !important',
  },
  chooseExperience: {
    position: 'absolute',
    zIndex: 1000,
    padding: '5px 5px 5px 50px',
    marginTop: '-5px',
    marginLeft: '-5px',
  },
  chooseExperienceOpen: {
    pointerEvents: 'auto',
    backgroundColor: theme.palette.secondary.main,
    borderTopRightRadius: '10%',
    borderBottomRightRadius: '10%',
    border: '1px solid white',
  },
  chooseExperienceClosed: {
    transition: 'top 0s linear 0.2s',
    pointerEvents: 'none',
  },
  timelineEntryIconOption: {
    width: '40px',
    height: '40px',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    borderRadius: '50%',
    marginLeft: '5px',
  },
  timelineEntryIconOptionOpen: {
    opacity: 1,
    transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 0.8s',
    transitionDelay: '0ms, 0s',
  },
  timelineEntryIconOptionClosed: {
    opacity: 0,
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
  optionSvg: {
    position: 'relative',
    width: '24px',
    height: '24px',
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
  const { meal, deleteMealAction } = props;
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const [experienceStatusClass, setExperienceStatusClass] = useState(classes.chooseExperienceClosed);
  const [iconOptionStatusClass, setIconOptionStatusClass] = useState(classes.timelineEntryIconOptionClosed);

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

  const toggleOptions = () => {
    if (open) {
      setOpen(false);
      setExperienceStatusClass(classes.chooseExperienceClosed);
      setIconOptionStatusClass(classes.timelineEntryIconOptionClosed);
    } else {
      setOpen(true);
      setExperienceStatusClass(classes.chooseExperienceOpen);
      setIconOptionStatusClass(classes.timelineEntryIconOptionOpen);
    }
  };

  return (
    <div className={classes.timelineEntry}>
      <div>
        <span className={classes.timelineEntryIcon}>
          <SvgIcon className={classes.svg} onClick={toggleOptions}>
            <path d={icon} />
          </SvgIcon>
        </span>
        <div
          className={`${classes.chooseExperience} ${experienceStatusClass}`}
          role="menu"
          aria-orientation="horizontal"
        >
          <IconButton
            aria-label="good"
            className={`${classes.timelineEntryIconOption} ${classes.good} ${iconOptionStatusClass}`}
          >
            <SvgIcon className={classes.optionSvg}>
              <path d={icon} />
            </SvgIcon>
          </IconButton>
          <IconButton
            aria-label="meh"
            className={`${classes.timelineEntryIconOption} ${classes.meh} ${iconOptionStatusClass}`}
          >
            <SvgIcon className={classes.optionSvg}>
              <path d={icon} />
            </SvgIcon>
          </IconButton>
          <IconButton
            aria-label="good"
            className={`${classes.timelineEntryIconOption} ${classes.bad} ${iconOptionStatusClass}`}
          >
            <SvgIcon className={classes.optionSvg}>
              <path d={icon} />
            </SvgIcon>
          </IconButton>
        </div>
      </div>
      <Card className={classes.timelineEntryContent}>
        <CardHeader
          className={classes.head}
          action={
            <IconButton aria-label="settings" onClick={deleteMealAction}>
              <DeleteIcon color="primary" />
            </IconButton>
          }
          titleTypographyProps={{ variant: 'body' }}
          title={meal.what}
        />
        <CardContent className={classes.content}>
          <hr color="white" />
          <Typography variant="caption">
            {meal.type} | {moment(meal.when).format('hh:mm A')} | {meal.location}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

TimelineEntry.propTypes = {
  meal: PropTypes.objectOf(PropTypes.any),
  deleteMealAction: PropTypes.func.isRequired,
};

export default TimelineEntry;
