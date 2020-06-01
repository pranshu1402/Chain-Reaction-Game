import * as actionTypes from '../../constants/ActionTypes';
import {
	directions,
	scaleDownAtomBy,
	canvasDimensions
} from '../../constants/index';
import * as canvasActions from '../../utils/Canvas';

/* 
	INITIALISING/RESETTING GAME 
*/
const getBoardDimensions = grid => {
	const boardDimensions = {
		rows: grid,
		columns: grid
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
		present: 0
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

export const initializeGame = (isReset, homeState) => {
	const newState = { ...homeState };
	newState.blocks = createNewBlocks(newState.grid);
	newState.turn = 0;
	newState.color = homeState.players[0].color;
	newState.isGameStarted = true;
	newState.isReset = isReset;
	newState.boardDimensions = getBoardDimensions(homeState.grid);
	canvasActions.initBoard(newState.boardDimensions, newState.color);

	return {
		type: isReset ? actionTypes.RESET_GAME : actionTypes.INITIALIZE_GAME,
		newState
	};
};

/* 
	EXECUTING PLAYER MOVES

*/

/* const subscribeToMove = () => {};

const publishMove = () => {}; */

const calcCoordinates = (direction, block) => {
	/* 
		In blocks every block will have x and y coordinate val.
		While executing move of a player just add [{1, 0} , {0, 1}, {-1, 0}, {0, -1}] these
		obj to x, y obj one by one and makeChanges in the coordinates thus obtained if exists.
	*/
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

const resetBlock = block => {
	return createNewBlock(block.row, block.col);
};

const updateBlock = (block, color, turn, isOverlap) => {
	if (!isOverlap && block.present && block.color !== color) {
		return null;
	}
	const newBlock = { ...block };
	newBlock.color = color;
	newBlock.player = `p${turn}`;
	newBlock.present++;
	return newBlock;
};

const handleMoleculeSplit = (state, blockId, queue, isOverlap) => {
	if (!blockId) return false;

	let { blocks, turn, color } = state;
	let newBlock = updateBlock(blocks[blockId], color, turn, isOverlap);

	if (!newBlock) return false;

	/* If block contains more than its capacity then its time to split */
	if (newBlock.present > newBlock.capacity) {
		newBlock = resetBlock(newBlock);
		queue.push(newBlock);
	}

	blocks[blockId] = newBlock;
	return true;
};

const executeAMove = (boardState, blockId) => {
	const overflowedBlocks = [];
	if (!handleMoleculeSplit(boardState, blockId, overflowedBlocks, false))
		return boardState;

	while (overflowedBlocks.length !== 0) {
		const activeBlock = overflowedBlocks.shift();
		for (let i = 0; i < 4; i++) {
			const nextBlockCoordinate = calcCoordinates(directions[i], activeBlock);
			handleMoleculeSplit(
				boardState,
				nextBlockCoordinate,
				overflowedBlocks,
				true
			);
		}
	}
};

const setNextPlayerTurn = newState => {
	console.log('setting next player turn', newState);
	newState.turn++;
	newState.turn %= newState.players.length;
	newState.color = newState.players[newState.turn].color;
	return { turn: newState.turn, color: newState.color };
};

/* Evaluate the game board before updating the turn */
const evaluateBoard = state => {
	const blocks = state.blocks;
	const players = { ...state.players };
	for (const blockId in blocks) {
		const block = blocks[blockId];
		const player = Number(block.player.slice(1));
		players[player].cellCount += 1;
	}

	let activePlayers = 0,
		winningCandidate;
	for (const player in players) {
		if (player.cellCount || !player.turnsCount) {
			activePlayers++;
			winningCandidate = player;
		} else {
			player.isActive = false;
		}
	}

	if (activePlayers === 1) {
		/* Stop the game */
		return {
			...state,
			blocks: { ...blocks },
			isGameActive: false,
			winner: winningCandidate
		};
		/* TODO: Update status & Reset block */
	} else {
		return { ...state, blocks: { ...blocks }, ...setNextPlayerTurn(state) };
	}
};

export const handleMove = (boardState, blockId) => {
	/* Received props are coordinates, blocks, currentColor */
	/* if game is online && it's not a subscribed 
		change then publish it to online database */
	/* Run the changes on canvas utility */
	executeAMove(boardState, blockId);
	const newState = evaluateBoard(boardState);
	if (!newState.winner) {
		canvasActions.initBoard(boardState.boardDimensions, newState.color);
	}

	return {
		type: actionTypes.EXECUTE_MOVE,
		newState
	};
};

export const undoMove = () => {
	return {
		type: actionTypes.UNDO_MOVE
	};
};
