import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  timeline: {
    width: '95%',
    // maxWidth: '1170px',
    margin: '0 auto',
    position: 'relative',
    padding: '2em 0',
    '&::before': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: '18px',
      height: '100%',
      width: '4px',
      background: theme.palette.primary.light,
    },
    '&::after': {
      content: "''",
      display: 'table',
      clear: 'both',
    },
  },
}));

const Timeline = (props) => {
  const { children } = props;
  const classes = useStyles(props);
  return <div className={classes.timeline}>{children}</div>;
};

Timeline.propTypes = { children: PropTypes.node };

export default Timeline;
