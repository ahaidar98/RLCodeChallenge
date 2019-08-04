import {
		DEVICES_LOAD_SUCCESS,
		DEVICES_LOAD_START,
		DEVICES_LOAD_DONE,
		DEVICES_LOAD_FAILED,
		CHANGE_DEVICE_STATE,
	} from './constants';

	const initialState = {
		devices: [],
		deviceStatus: '',
		deviceErrorMessage: '',
	};

	export default (state = initialState, action) => {
	  switch (action.type) {
	    case DEVICES_LOAD_SUCCESS:
	      return { ...state, devices: action.payload };

	    case DEVICES_LOAD_START:
	      return { ...state, deviceStatus: 'Loading' };

	    case DEVICES_LOAD_DONE:
	      return { ...state, deviceStatus: 'Done' };

	    case DEVICES_LOAD_FAILED:
	      return { ...state, deviceStatus: 'Failed', deviceErrorMessage: action.errMesg };

			case CHANGE_DEVICE_STATE:
				const devicesData = (state.devices && state.devices.data) || [];
				const newDevicesData = [...devicesData];

				newDevicesData.forEach(device => {
					if(device.id === action.id && device.attributes) {
						device.attributes.state = (device.attributes.state === 'locked') ? 'unlocked' : 'locked';
					}
				});
				return {...state, devices: { data: newDevicesData }
			}

	    default:
	      return state;
	  }
	};
