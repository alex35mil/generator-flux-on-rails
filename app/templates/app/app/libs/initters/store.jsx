import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';


export default (params) => {
  const { reducers, initialState } = params;

  const combinedReducers = combineReducers(reducers);
  const composedStore    = compose(applyMiddleware(thunkMiddleware));
  const storeCreator     = composedStore(createStore);

  const args = (
    initialState ?
    [ combinedReducers, initialState ] :
    [ combinedReducers ]
  );

  return storeCreator(...args);
}
