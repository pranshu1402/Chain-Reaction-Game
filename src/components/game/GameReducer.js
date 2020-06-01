import * as actionTypes from '../../constants/ActionTypes';

const initialGameState = {
	grid: 8,
	numPlayers: 2,
	players: null,
	blocks: null,
	isGameStarted: false,
	turn: -1,
	color: '',
	isReset: false,
	boardDimensions: null
};

const gameReducer = (state = initialGameState, action) => {
	switch (action.type) {
		case actionTypes.INITIALIZE_GAME:
			return { ...state, ...action.newState };
		case actionTypes.EXECUTE_MOVE:
			return { ...state, ...action.newState };
		case actionTypes.RESET_GAME:
			return { ...state, ...action.newState };
		case actionTypes.UNDO_MOVE:
			return { ...state, ...action.newState };
		default:
			break;
	}

	return state;
};

export default gameReducer;
