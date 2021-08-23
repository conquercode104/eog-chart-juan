import { makeStyles } from '@material-ui/core';
import React from 'react';
import Chart from './Chart';
import InfoActions from './InfoActions';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    boxSizing: 'border-box',
    gridTemplateRows: 'auto 1fr',
  },
});

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <InfoActions />
      <Chart />
    </div>
  );
};
