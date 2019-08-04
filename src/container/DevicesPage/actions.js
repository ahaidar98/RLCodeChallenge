import {
	FETCH_DEVICES,
	DEVICES_LOAD_SUCCESS,
	DEVICES_LOAD_START,
	DEVICES_LOAD_DONE,
	DEVICES_LOAD_FAILED,
	CHANGE_DEVICE_STATE,
	} from './constants';

	export const getDevices = () => {
	  return ({
	    type: FETCH_DEVICES,
	  });
	}

	export const onSuccessDevices = data => {
	  return ({
	    type: DEVICES_LOAD_SUCCESS,
	    payload: data,
	  });
	};

	export const onDeviceStateChange = (id) => {
	  return ({
	    type: CHANGE_DEVICE_STATE,
			id
	  });
	};

	export const onLoadDevicesStart = () => {
	  return ({
	    type: DEVICES_LOAD_START,
	  });
	};

	export const onLoadDevicesDone = () => {
	  return ({
	    type: DEVICES_LOAD_DONE,
	  });
	};

	export const onLoadDevicesFailed = (errMsg) => {
	  return ({
	    type: DEVICES_LOAD_FAILED,
			errMsg
	  });
	};
