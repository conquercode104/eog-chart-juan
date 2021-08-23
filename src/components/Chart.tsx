import { makeStyles } from '@material-ui/core';
import React, { SetStateAction, useState, useMemo } from 'react';

import { useSelector } from 'react-redux';
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler,
  Resizable,
} from 'react-timeseries-charts';
import { getTrafficSeries, getAxis, getSeries } from '../store/selectors/measurments';

const minutesAgo = (minute: number) => Date.now() - minute * 60 * 1000;

const useStyles = makeStyles({
  container: {
    boxSizing: 'border-box',
    padding: '1rem',
    display: 'grid',
  },
});

const colors = [
  '#050505',
  '#C70039',
  '#FF5733',
  '#FFC300',
  '#900C3F',
  '#DAF7A6',
];

function Chart() {
  const classes = useStyles();
  const [tracker, setTracker] = useState(null);
  const [trackerInfo, setTrackerInfo] = useState([]);
  const series = useSelector(getSeries);
  const trafficSeries = useSelector(getTrafficSeries);
  const axis = useSelector(getAxis);

  const timeRange = useMemo(() => trafficSeries.timerange([
    minutesAgo(10),
    Date.now(),
  ]), [trafficSeries]);

  function onTrackerChanged(t: any) {
    setTracker(t);
    if (!t) {
      setTrackerInfo([]);
    } else {
      setTrackerInfo(
        series.map((s: any) => {
          const i = s.bisect(new Date(t));
          return {
            label: s.name(),
            value: s
              .at(i)
              .get('value')
              .toString(),
          };
        }) as SetStateAction<never[]>,
      );
    }
  }

  if (!timeRange) {
    return <div style={{ placeItems: 'center' }} className={classes.container}>Empty</div>;
  }

  return (
    <div className={classes.container}>
      <Resizable>
        <ChartContainer
          timeRange={timeRange}
          onTrackerChanged={onTrackerChanged}
          trackerPosition={tracker}
        >
          <ChartRow
            height={500}
            trackerShowTime
            trackerInfoValues={trackerInfo}
            trackerInfoHeight={10 + trackerInfo.length * 16}
            trackerInfoWidth={140}
          >
            {axis.map((metricSeries: any, i: number) => (
              <YAxis
                key={`${i + 1}`}
                id={metricSeries.id}
                label={metricSeries.label}
                min={metricSeries.min}
                max={metricSeries.max}
                width={60}
                type="linear"
              />
            ))}
            <Charts>
              {series.map((metricSeries: any, i: number) => {
                const style = styler(
                  series.map(() => ({
                    key: 'value',
                    color: colors[i],
                    selected: '#2CB1CF',
                  })) as any,
                );
                return (
                  <LineChart
                    key={`${i + 1}`}
                    style={style}
                    axis={metricSeries.atLast().get('unit')}
                    series={metricSeries}
                    column={['value']}
                  />
                );
              })}
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    </div>
  );
}

export default Chart;