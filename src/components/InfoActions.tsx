import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import FabMenu from './FabMenu';
import InfoCard from './InfoCard';
import { selectMetric } from '../store/slices/measurments';
import { getAllMetrics, getSelectedMetrics } from '../store/selectors/measurments';

const useStyles = makeStyles({
  title: { fontSize: 14 },
  container: {
    width: '100vw',
    height: 'auto',
    display: 'flex',
    padding: '16px',
    gridGap: '1rem',
    boxSizing: 'border-box',
    justifyContent: 'center',
    background: 'transparent',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});

const InfoActions: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allMetrics = useSelector(getAllMetrics);
  const selectedMetrics = useSelector(getSelectedMetrics);

  function handleItemSelected(value: string) {
    dispatch(selectMetric(value));
  }

  return (
    <div className={classes.container}>
      {
        selectedMetrics.map(metric => <InfoCard key={metric} metric={metric} />)
      }
      <FabMenu
        Icon={AddIcon}
        selectedItems={selectedMetrics}
        items={allMetrics}
        onClick={handleItemSelected}
      />
    </div>
  );
};

export default InfoActions;