import * as actionTypes from '../../constants/ActionTypes';

const initialHomeState = {
	players: null,
	numPlayers: 2,
	grid: 8,
	shouldGameInitiate: false,
};

const homePageReducer = (state = initialHomeState, action) => {
	switch (action.type) {
		case actionTypes.SET_GAME_DETAILS:
			return {
				...state,
				players: action.data.players,
				numPlayers: action.data.numPlayers,
				grid: action.data.grid,
				shouldGameInitiate: true,
			};
		default:
			break;
	}

	return state;
};

export default homePageReducer;
