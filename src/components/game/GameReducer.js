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
	boardDimensions: null,
};

/* 
	In blocks every block will have x and y coordinate val.
	While executing move of a player just add [{1, 0} , {0, 1}, {-1, 0}, {0, -1}] these
	obj to x, y obj one by one and makeChanges in the coordinates thus obtained if exists.
*/

const setNextPlayerTurn = newState => {
	newState.turn++;
	newState.turn %= newState.numPlayers;
	newState.color = newState.players[newState.turn].color;
	return { turn: newState.turn, color: newState.color };
};

const gameReducer = (state = initialGameState, action) => {
	switch (action.type) {
		case actionTypes.INITIALIZE_GAME:
			return action.newState;
		case actionTypes.EXECUTE_MOVE:
			return state;
		default:
			break;
	}

	return state;
};

export default gameReducer;
