import {
	  USER_LOAD_SUCCESS,
	  USER_LOAD_START,
	  USER_LOAD_DONE,
		USER_LOAD_FAILED,
	} from './constants';

	const initialState = {
		users:[],
		userStatus: '',
		usersErrorMessage: '',
	};

	export default (state = initialState, action) => {
	  switch (action.type) {
	    case USER_LOAD_SUCCESS:
	      return { ...state, users: action.payload };

	    case USER_LOAD_START:
	      return { ...state, userStatus: 'Loading' };

	    case USER_LOAD_DONE:
	      return { ...state, userStatus: 'Done' };

	    case USER_LOAD_FAILED:
	      return { ...state, userStatus: 'Failed', usersErrorMessage: action.errMsg };

	    default:
	      return state;
	  }
	};
