import {
	  FETCH_USER_DATA,
	  USER_LOAD_SUCCESS,
	  USER_LOAD_START,
	  USER_LOAD_DONE,
		USER_LOAD_FAILED,
	} from './constants';

	export const getUsers = () => {
	  return ({
	    type: FETCH_USER_DATA,
	  });
	}

	export const onUserSuccess = data => {
	  return ({
	    type: USER_LOAD_SUCCESS,
	    payload: data,
	  });
	};

	export const onUserLoadStart = () => {
	  return ({
	    type: USER_LOAD_START,
	  });
	};

	export const onUserLoadDone = () => {
	  return ({
	    type: USER_LOAD_DONE,
	  });
	};

	export const onUserLoadFailed = (errMsg) => {
	  return ({
	    type: USER_LOAD_FAILED,
			errMsg
	  });
	};
