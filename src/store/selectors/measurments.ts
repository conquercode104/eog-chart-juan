import { createSelector } from 'reselect';
import { TimeSeries as TimeSeriesDefault } from 'pondjs';
import { IAppState } from '..';

const state = (state: IAppState) => state.measurments;

const TimeSeries = TimeSeriesDefault as any;

export const getAllMetrics = createSelector(state, (state) => state.allMetrics);

export const getSelectedMetrics = createSelector(state, (state) => state.metrics);

export const getMetricInfo = (metric: string) => createSelector(
  state,
  (state) => state.infoMetrics[metric],
);

export const getSeries = createSelector(
  state,
  (state) => state.metrics.map(metric => state.data[metric]),
);

export const getTrafficSeries = createSelector(getSeries, (series) => {
  const hey = TimeSeries.timeSeriesListMerge({
    name: 'Metrics',
    seriesList: series,
  });
  return hey;
});

export const getAxis = createSelector(
  getSeries,
  (series) => series.filter((r: any) => r).reduce((init: any, next: any) => {
    const unit = next.atLast().get('unit');
    const existingElement = init.find((a: any) => a.id === unit);
    if (!existingElement) {
      init.push({
        id: unit,
        label: unit,
        min: next.min(),
        max: next.max(),
      });
    } else {
      const existingMin = next.min();
      const existingMax = next.max();
      existingElement.min = Math.min(existingElement.min, existingMin);
      existingElement.max = Math.max(existingElement.max, existingMax);
    }
    return init;
  }, []),
);