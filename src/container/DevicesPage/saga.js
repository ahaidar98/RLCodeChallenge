import { takeLatest, put } from 'redux-saga/effects';

import { FETCH_DEVICES } from './constants';
import {
  onSuccessDevices,
  onLoadDevicesStart,
  onLoadDevicesDone,
  onLoadDevicesFailed
} from './actions';


  function* getDevices() {
		const requestURL = 'https://gist.githubusercontent.com/rafaelsales/07536fe2382cac28326989bca7535c02/raw/1218ebef349d03f721f8226a3f075cc771c61dbd/z_devices.json';

	  try {
	    yield put(onLoadDevicesStart());

	    const response = yield fetch(requestURL);
			const jsonData = yield response.json();

	    yield put(onSuccessDevices(jsonData));
	    yield put(onLoadDevicesDone());
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
	    yield put(onLoadDevicesFailed(errMsgs));
	  }
	}

	export function* DevicesPageSaga() {
	  yield takeLatest(FETCH_DEVICES, getDevices);
	}

	export default DevicesPageSaga;
