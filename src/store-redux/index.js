import { applyMiddleware, combineReducers, createStore } from 'redux';
import * as reducers from './exports';
import thunk from 'redux-thunk';
export default function createStoreRedux(services, config = {}) {
  return createStore(
    combineReducers(reducers),
    undefined,
    applyMiddleware(thunk.withExtraArgument(services)),
  );
}
