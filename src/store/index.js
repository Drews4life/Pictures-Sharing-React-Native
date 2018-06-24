import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

let composeEnhancers = compose;

if(__DEV__) {
  composeEnhancers = compose;
}

const configureStore = () => {
  return createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
