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

const setNextPlayerTurn = newState => {
	newState.turn++;
	newState.turn %= newState.numPlayers;
	newState.color = newState.players[newState.turn].color;
	return { turn: newState.turn, color: newState.color };
};

const initGame = homeState => {
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

const updateBlock = (block, color, turn, isOverlap) => {
	if (!isOverlap && block.present && block.color !== color) {
		return block;
	}
	const newBlock = { ...block };
	newBlock.color = color;
	newBlock.player = `p${turn}`;
	newBlock.present++;
	return newBlock;
};

const handleBlockSplitting = (state, blockId, queue, isOverlap) => {
	if (!blockId) return;

	let { blocks, turn, color } = state;
	let newBlock = updateBlock(blocks[blockId], color, turn, isOverlap);

	/* If block contains more than its capacity then its time to split */
	if (newBlock.present > newBlock.capacity) {
		newBlock = resetBlock(newBlock);
		queue.push(newBlock);
	}

	blocks[blockId] = newBlock;
	return;
};

const executeAMove = (state, blockId) => {
	const queue = [];
	handleBlockSplitting(state, blockId, queue, false);

	while (queue.length !== 0) {
		const activeBlock = queue.shift();
		console.log(activeBlock);
		for (let i = 0; i < 4; i++) {
			const nextBlockCoordinate = calcCoordinates(directions[i], activeBlock);
			handleBlockSplitting(state, nextBlockCoordinate, queue, true);
		}
	}

	return { ...state, ...setNextPlayerTurn(state), blocks: { ...state.blocks } };
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
