import {combineReducers} from 'redux';
import PlacesReducer from './PlacesReducer';
import UIReducer from './UIReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  places: PlacesReducer,
  ui: UIReducer,
  auth: AuthReducer
});
