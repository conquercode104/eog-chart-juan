import {
    Card, CardContent, makeStyles, Typography,
  } from '@material-ui/core';
  import React, { FunctionComponent } from 'react';
  import { useSelector } from 'react-redux';
  import { getMetricInfo } from '../store/selectors/measurments';
  
  interface IProps {
    metric: string
  }
  
  const useStyles = makeStyles({
    card: {
      padding: '0 2rem',
    },
  });
  
  const InfoCard: FunctionComponent<IProps> = ({ metric }) => {
    const classes = useStyles();
    const value = useSelector(getMetricInfo(metric));
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>{metric}</Typography>
          <Typography variant="h4" component="h2">{value}</Typography>
        </CardContent>
      </Card>
    );
  };
  
  export default InfoCard;