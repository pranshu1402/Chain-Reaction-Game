import * as actions from '../../constants/ActionTypes';

const initial_state = {
	user: null,
	redirectTo: '/'
};

const authReducer = (state = initial_state, action) => {
	switch (action.type) {
		case actions.AUTH_SUCCESS:
			return { ...state, user: action.userData };
		case actions.AUTH_LOGOUT:
			return initial_state;
		case actions.AUTH_FAIL:
			console.log(action.error);
			break;
		case actions.AUTH_SET_REDIRECT:
			return { ...state, redirectTo: action.redirectTo };
		default:
			break;
	}
	return state;
};

export default authReducer;
