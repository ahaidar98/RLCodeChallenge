import { fork, all } from 'redux-saga/effects';

//import file here
import UserPageSaga from './container/UserPage/saga';
import DevicesPageSaga from './container/DevicesPage/saga';

// ex in yeild: fork(filename imported)
function* rootSaga() {
  yield all([
    fork(UserPageSaga),
    fork(DevicesPageSaga),
  ]);
}

export default rootSaga;
