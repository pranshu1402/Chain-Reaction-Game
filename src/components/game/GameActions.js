import * as actionTypes from '../../constants/ActionTypes';
import {
	directions,
	scaleDownAtomBy,
	canvasDimensions,
} from '../../constants/index';

/* 
	INITIALISING/RESETTING GAME 
*/
const getBoardDimensions = grid => {
	const boardDimensions = {
		rows: grid,
		columns: grid,
	};

	boardDimensions.canvasWidth = canvasDimensions.width;
	boardDimensions.canvasHeight = canvasDimensions.height;
	boardDimensions.cellWidth = canvasDimensions.width / grid;
	boardDimensions.ballRadius = boardDimensions.cellWidth / scaleDownAtomBy;
	return boardDimensions;
};

const calcCapacity = (row, col) => {
	let capacity = 1;
	if (row !== 0) {
		capacity++;
	}

	if (col !== 0) {
		capacity++;
	}

	return capacity;
};

const createNewBlock = (i, j) => {
	return {
		row: i,
		col: j,
		player: '',
		color: '',
		capacity: calcCapacity(i, j),
		present: 0,
	};
};

const createNewBlocks = grid => {
	const blocks = {};
	for (let i = 0; i < grid; i++) {
		for (let j = 0; j < grid; j++) {
			blocks[`${i}${j}`] = createNewBlock(i, j);
		}
	}

	return blocks;
};

/* Initialize or Reset Game based on the request. */
export const initializeGame = (isReset, homeState) => {
	const newState = { ...homeState };
	newState.blocks = createNewBlocks(newState.grid);
	newState.turn = 0;
	newState.color = homeState.players[0].color;
	newState.isGameStarted = true;
	newState.isReset = isReset;
	newState.boardDimensions = getBoardDimensions();

	return {
		type: isReset ? actionTypes.RESET_GAME : actionTypes.INITIALIZE_GAME,
		newState,
	};
};

/* 
	EXECUTING PLAYER MOVES

*/

/* const subscribeToMove = () => {};

const publishMove = () => {}; */

const calcCoordinates = (direction, block) => {
	let row = block.row;
	let col = block.col;

	row += direction.row;
	col += direction.col;

	if (row >= 0 && col >= 0) {
		return `${row}${col}`;
	} else {
		return '';
	}
};

export const executeMove = state => {
	/* Check if valid Move or not */
	// Determine the click location in canvas
	// Check if the click location is within any empty box / box with same player atoms.

	/* If valid move && game is online && it's not a subscribed 
	change then publish it to online database */

	/* Run the changes on canvas utility */

	return {
		type: actionTypes.EXECUTE_MOVE,
	};
};

export const undoMove = () => {
	return {
		type: actionTypes.UNDO_MOVE,
	};
};
