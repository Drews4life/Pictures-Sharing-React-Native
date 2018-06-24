import {combineReducers} from 'redux';
import PlacesReducer from './PlacesReducer';
import UIReducer from './UIReducer';

export default combineReducers({
  places: PlacesReducer,
  ui: UIReducer
});
