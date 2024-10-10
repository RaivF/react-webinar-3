import { applyMiddleware, combineReducers, createStore } from 'redux';
import * as reducers from './exports';
import { withExtraArgument } from 'redux-thunk'; // изменен импорт

export default function createStoreRedux(services, config = {}) {
  return createStore(
    combineReducers(reducers),
    undefined,
    applyMiddleware(withExtraArgument(services)), // используем именованный экспорт
  );
}
