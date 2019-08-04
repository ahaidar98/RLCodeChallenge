import { takeLatest, put } from 'redux-saga/effects';

import { FETCH_USER_DATA } from './constants';
import {
  onUserSuccess,
  onUserLoadStart,
  onUserLoadDone,
  onUserLoadFailed
} from './actions';


  function* getUsers() {
		const requestURL = 'https://gist.githubusercontent.com/rafaelsales/07536fe2382cac28326989bca7535c02/raw/1218ebef349d03f721f8226a3f075cc771c61dbd/z_users.json';

	  try {
	    yield put(onUserLoadStart());

	    const response = yield fetch(requestURL);
			const jsonData = yield response.json();

	    yield put(onUserSuccess(jsonData));
      yield put(onUserLoadDone());
	  } catch (e) {
      // Unhandled Error Message
      const errorsObj = (e.response && e.response.data) ? e.response.data : {};
      let errMsgs = [];

      Object.keys(errorsObj).forEach((key) => {
        errMsgs = errMsgs.concat(errorsObj[key].map(errMsg => {
          if (!key || key === '') return errMsgs;
          return `${key.replace(/_/g, ' ')} ${errMsgs}`;
        }));
      });
	    yield put(onUserLoadFailed(errMsgs));
	  }
	}

	export function* UserPageSaga() {
	  yield takeLatest(FETCH_USER_DATA, getUsers);
	}

	export default UserPageSaga;
