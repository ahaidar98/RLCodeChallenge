import { combineReducers } from 'redux';

// import files here
import UserPageReducer from './container/UserPage/reducer';
import DevicesPageReducer from './container/DevicesPage/reducer';

export default () => {
  return combineReducers({
    UserPage: UserPageReducer,
    DevicesPage: DevicesPageReducer,
  });
};
