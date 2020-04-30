import * as actionTypes from '../../constants/ActionTypes';
import { directions } from '../../constants/index';

const initialGameState = {
	grid: 8,
	numPlayers: 2,
	isGameActive: false,
	players: null,
	blocks: null,
	turn: -1,
	color: '',
};

/* In blocks every block will have x and y coordinate val.
	While executing move of a player just add [{1, 0} , {0, 1}, {-1, 0}, {0, -1}] these
	obj to x, y obj one by one and makeChanges in the coordinates thus obtained if exists.
*/

const calcCapacity = (row, col, grid) => {
	let capacity = 1;
	if (row !== 0 && row < grid - 1) {
		capacity++;
	}

	if (col !== 0 && col < grid - 1) {
		capacity++;
	}

	return capacity;
};

const createNewBlock = (i, j, grid) => {
	return {
		row: i,
		col: j,
		player: '',
		color: '',
		capacity: calcCapacity(i, j, grid),
		present: 0,
		directions: [],
	};
};

const createNewBlocks = grid => {
	const blocks = {};
	for (let i = 0; i < grid; i++) {
		for (let j = 0; j < grid; j++) {
			blocks[`${i}${j}`] = createNewBlock(i, j, grid);
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
	newState.isGameActive = true;
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
		return null;
	}
	const newBlock = { ...block };
	newBlock.color = color;
	newBlock.player = `p${turn}`;
	newBlock.present++;
	return newBlock;
};

const handleBlockSplitting = (state, blockId, queue, isOverlap) => {
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

const executeAMove = (state, blockId) => {
	const queue = [];
	if (!handleBlockSplitting(state, blockId, queue, false)) return state;

	while (queue.length !== 0) {
		const activeBlock = queue.shift();
		for (let i = 0; i < 4; i++) {
			const nextBlockCoordinate = calcCoordinates(directions[i], activeBlock);
			handleBlockSplitting(state, nextBlockCoordinate, queue, true);
		}
	}

	return { ...state, ...setNextPlayerTurn(state), blocks: { ...state.blocks } };
};

/* Evaluate the game board before updating the turn */
const evaluateBoard = (state, blocks) => {
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
			winner: winningCandidate,
		};
		/* Update status & Reset block */
	} else {
		return { ...state, blocks: { ...blocks }, ...setNextPlayerTurn(state) };
	}
};

const gameReducer = (state = initialGameState, action) => {
	switch (action.type) {
		case actionTypes.INITIALIZE_GAME:
			return initGame(action.homeState);
		case actionTypes.EXECUTE_MOVE:
			return executeAMove(state, action.blockId);
		case actionTypes.EVALUATE_BOARD:
			return evaluateBoard(state, action.blocks);
		default:
			break;
	}

	return state;
};

export default gameReducer;
