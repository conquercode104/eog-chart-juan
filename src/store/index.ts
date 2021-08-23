import { configureStore, createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';
import measurments from './slices/measurments';
import { IMeasurmentState } from './slices/measurments.types';

export interface IAppState {
  measurments: IMeasurmentState
}

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable: () => true,
});

export const store = configureStore<IAppState>({
  middleware: [serializableMiddleware],
  reducer: {
    measurments,
  },
});
