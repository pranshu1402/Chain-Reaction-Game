import * as actionTypes from '../../constants/ActionTypes';

const initialGameState = {
	grid: 8,
	numPlayers: 2,
	players: null,
	blocks: null,
	turn: -1,
	color: '',
	isGameActive: false,
	winner: ''
};

const gameReducer = (state = initialGameState, action) => {
	switch (action.type) {
		case actionTypes.INITIALIZE_GAME:
			return { ...state, ...action.gameState };
		case actionTypes.EXECUTE_MOVE:
			return { ...state, ...action.newGameState };
		case actionTypes.INCREMENT_TURN:
			return { ...state, ...action.newGameState };
		case actionTypes.UNDO_MOVE:
			return { ...state, ...action.newGameState };
		case actionTypes.RESET_GAME:
			return { ...initialGameState, ...action.gameState };
		default:
			break;
	}

	return state;
};

export default gameReducer;
