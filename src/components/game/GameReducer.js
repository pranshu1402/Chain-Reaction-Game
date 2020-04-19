import * as actionTypes from '../../constants/ActionTypes';
import { directions } from '../../constants/index';

const initialGameState = {
	grid: 8,
	numPlayers: 2,
	players: null,
	blocks: null,
	turn: -1,
	color: '',
};

/* In blocks every block will have x and y coordinate val.
	While executing move of a player just add [{1, 0} , {0, 1}, {-1, 0}, {0, -1}] these
	obj to x, y obj one by one and makeChanges in the coordinates thus obtained if exists.
*/

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

const setNextPlayerTurn = (state, turn) => {
	const newState = { ...state };
	newState.turn++;
	newState.turn %= newState.numPlayers;
	newState.color = newState.players[turn].color;
	return newState;
};

const initGame = homeState => {
	console.log('init Game', homeState);
	const newState = { ...initialGameState };
	newState.grid = homeState.grid;
	newState.numPlayers = homeState.numPlayers;
	newState.players = homeState.players;
	newState.blocks = createNewBlocks(newState.grid);
	newState.turn = 0;
	newState.color = homeState.players[0].color;
	return newState;
};

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

const resetBlock = block => {
	return createNewBlock(block.row, block.col);
};

const updateBlock = (block, color, turn) => {
	const newBlock = { ...block };
	newBlock.color = color;
	newBlock.player = `p${turn}`;
	newBlock.present++;
	return newBlock;
};

const shouldBlockSplit = newBlock => {
	if (newBlock.present > newBlock.capacity) {
		resetBlock(newBlock);
		return true;
	}

	return false;
};

const executeAMove = (state, blockId) => {
	let { blocks, turn, color } = state;
	const queue = [];
	blocks = { ...blocks };
	blocks[blockId] = updateBlock(blocks[blockId], color, turn);
	if (shouldBlockSplit(blocks[blockId])) {
		queue.push(blocks[blockId]);
	}

	while (queue.length !== 0) {
		const activeBlock = queue.shift();
		for (let i = 0; i < 4; i++) {
			const nextBlockCoordinate = calcCoordinates(directions[i], activeBlock);
			let nextBlock = nextBlockCoordinate ? blocks[nextBlockCoordinate] : null;

			if (!nextBlock) {
				continue;
			}

			nextBlock = updateBlock(nextBlock, color, turn);
			blocks[nextBlockCoordinate] = nextBlock;
			if (shouldBlockSplit(nextBlock)) {
				queue.push(nextBlock);
			}
		}
	}

	return { ...state, blocks };
};

const gameReducer = (state = initialGameState, action) => {
	switch (action.type) {
		case actionTypes.INITIALIZE_GAME:
			return initGame(action.homeState);
		case actionTypes.EXECUTE_MOVE:
			return executeAMove(state, action.blockId);
		default:
			break;
	}

	return state;
};

export default gameReducer;
