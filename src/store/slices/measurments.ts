import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimeSeries as TimeSeriesDefault } from 'pondjs';
import { IDataPayload, IMeasurmentState } from './measurments.types';

const TimeSeries = TimeSeriesDefault as any;

const initialState: IMeasurmentState = {
  loading: true,
  allMetrics: [],
  metrics: [],
  infoMetrics: {},
  data: {},
};

const measurmentSlice = createSlice({
  name: 'measurment',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<IDataPayload[]>) {
      state.data = action.payload.reduce((inital, next) => {
        const { measurements, metric } = next;
        const points = measurements.map(el => [el.at, el.value, el.unit]);
        const series = new TimeSeries({
          name: metric,
          columns: ['time', 'value', 'unit'],
          points,
        });
        if (!inital[metric]) {
          inital[metric] = series;
        } else {
          inital[metric] = TimeSeries.timeSeriesListMerge({
            name: metric,
            seriesList: [inital[metric], series],
          });
        }
        return inital;
      }, state.data);
    },
    selectMetric: (state, action: PayloadAction<string>) => {
      if (state.metrics.includes(action.payload)) {
        state.metrics = state.metrics.filter(metric => metric !== action.payload);
      } else {
        state.metrics.push(action.payload);
      }
    },
    setInfoMetrics: (state, action: PayloadAction<{ metric: string, value: number }>) => {
      state.infoMetrics[action.payload.metric] = action.payload.value;
    },
    setAllMetrics: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.allMetrics = action.payload;
    },
  },
});

export const {
  setAllMetrics, selectMetric, setInfoMetrics, setData,
} = measurmentSlice.actions;

export default measurmentSlice.reducer;