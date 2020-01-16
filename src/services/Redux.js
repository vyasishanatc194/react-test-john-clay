import{ createStore, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

// eslint-disable-next-line import/no-mutable-exports
let store;

if (process.env.NODE_ENV === 'development') {
  store = createStore(rootReducer, applyMiddleware(logger, thunk));
} else {
  store = createStore(rootReducer);
}


const dispatch = (action) => {
  store.dispatch(action);
};

const getState = () => store.getState();

export { store, getState, dispatch };
