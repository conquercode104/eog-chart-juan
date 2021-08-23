import { gql, useQuery, useSubscription } from '@apollo/client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setAllMetrics, setData, setInfoMetrics } from '../store/slices/measurments';

const GET_ALL_METRICS = gql`
  query {
    getMetrics
  }
`;

const SUBSCRIBE_TO_DATA = gql`
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

function DataProvider() {
  const dispatch = useDispatch();

  const { error } = useQuery(GET_ALL_METRICS, {
    onCompleted({ getMetrics }) {
      dispatch(setAllMetrics(getMetrics));
    },
  });

  useSubscription(SUBSCRIBE_TO_DATA, {
    onSubscriptionData({ subscriptionData }) {
      const measurement = subscriptionData.data.newMeasurement;
      const { metric, value } = measurement;
      dispatch(setInfoMetrics({ metric, value }));
      dispatch(setData([{ metric, measurements: [measurement] }]));
    },
  });

  if (error) return <span>{error.message}</span>;
  return null;
}

export default DataProvider;
