import * as actionTypes from '../../constants/ActionTypes';

const initialHomeState = {
	players: null,
	numPlayers: 2,
	grid: 8,
};

const homePageReducer = (state = initialHomeState, action) => {
	switch (action.type) {
		case actionTypes.SET_GAME_DETAILS:
			return {
				...state,
				players: action.players,
				numPlayers: action.numPlayers,
				grid: action.grid,
			};
		default:
			break;
	}

	return state;
};

export default homePageReducer;
