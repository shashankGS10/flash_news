import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the store with the saga middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
