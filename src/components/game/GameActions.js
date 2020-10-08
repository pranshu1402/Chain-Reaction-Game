import { directions } from '../../constants/index';
import * as actionTypes from '../../constants/ActionTypes';

// let interval;

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
		id: `block${i}${j}`,
		player: '',
		color: '',
		capacity: calcCapacity(i, j, grid),
		present: 0,
		directions: [],
		willSplit: false,
		shouldSplit: false
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

export const initGame = homeState => {
	const newState = {};
	newState.grid = homeState.grid;
	newState.numPlayers = homeState.numPlayers;
	newState.players = homeState.playerData;
	newState.blocks = createNewBlocks(newState.grid);
	newState.turn = 0;
	newState.color = homeState.playerData[0].color;
	newState.isGameActive = true;
	return newState;
};

const calcCoordinates = (direction, block, gridSize) => {
	let row = block.row;
	let col = block.col;

	row += direction.row;
	col += direction.col;
	if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
		return `${row}${col}`;
	} else {
		return '';
	}
};

/* const resetBlock = block => {
	return createNewBlock(block.row, block.col);
}; */

const setNextPlayerTurn = newState => {
	newState.turn++;
	newState.turn %= newState.players.length;
	while (!newState.players[newState.turn].isActive) {
		newState.turn++;
		newState.turn %= newState.players.length;
	}

	newState.color = newState.players[newState.turn].color;
};

const evaluateBoard = gameState => {
	const players = [...gameState.players];
	for (const blockId in gameState.blocks) {
		const block = gameState.blocks[blockId];
		if (block.present) {
			const player = Number(block.player.slice(1));
			players[player].cellCount += 1;
		}
	}

	let activePlayers = 0,
		winningCandidate = { cellCount: 0 };
	for (const player of players) {
		if (player.cellCount || !player.turnsCount) {
			activePlayers++;
			if (player.cellCount > winningCandidate.cellCount)
				winningCandidate = player;
		} else {
			player.isActive = false;
		}

		player.cellCount = 0;
	}

	if (activePlayers === 1) {
		/* Stop the game */
		gameState.isGameActive = false;
		gameState.winner = winningCandidate;
		gameState.color = 'grey';
	}
};

/* Check if its a valid move based on: 
	- Current player color
	- Color on the requested block
	- If move is at original player click location or due to bursting effect
*/
const checkMoveValidity = gameState => {
	return (
		gameState.isGameActive &&
		(gameState.blockClicked.present === 0 ||
			gameState.blockClicked.color === gameState.color)
	);
};

const addToRenderQueue = (block, renderQueue) => {
	// console.log('AddToRender', JSON.stringify(block));
	const blockIndex = renderQueue.indexOf(block);
	if (blockIndex === -1) {
		// console.log('AddedToRender', JSON.stringify(block));
		renderQueue.push(block);
	}
};

/* Update a block = increase the count of the atoms and decide if it can/will burst */
const updateBlockMolecule = (block, color, turn) => {
	block.present += 1;
	block.color = color;
	block.player = `p${turn}`;
};

const updateBlockSplitState = block => {
	if (block.present > block.capacity) {
		block.present = block.present - block.capacity - 1;
		block.shouldSplit = true;
	} else {
		block.shouldSplit = false;
	}

	block.directions = [];
	// console.log('block state updated', JSON.stringify(block));
};

/* To react to the render queue i.e. keep updating and splitting molecules while the block is not null 
Once render Queue length reaches 0 set gameState.updating to false & clear the interval */
const reaction = (renderQueue, updateQueue, gameState) => {
	const newBlocks = { ...gameState.blocks };
	for (const currBlock of renderQueue) {
		updateBlockSplitState(currBlock);

		if (currBlock.shouldSplit) {
			for (const direction of directions) {
				const neighbourBlockId = calcCoordinates(
					direction,
					currBlock,
					gameState.grid
				);
				if (neighbourBlockId) {
					currBlock.directions.push(direction);
					updateQueue.push(gameState.blocks[neighbourBlockId]);
				}
			}
		}

		newBlocks[`${currBlock.row}${currBlock.col}`] = {
			...currBlock
		};
	}

	gameState.blocks = newBlocks;
	if (updateQueue.length) {
		updateQueue.push(null);
		gameState.updating = true;
	} else {
		gameState.updating = false;
	}

	return gameState;
};

/* To react to the render queue i.e. keep updating and splitting molecules while the block is not null 
Once render Queue length reaches 0 set gameState.updating to false & clear the interval */
const updateBlocks = (updateQueue, gameState) => {
	let currBlock = updateQueue.shift(),
		renderQueue = [];

	while (currBlock) {
		updateBlockMolecule(currBlock, gameState.color, gameState.turn);
		addToRenderQueue(currBlock, renderQueue);
		currBlock = updateQueue.shift();
	}

	// console.log('update list finished');

	return renderQueue;
};

const handleUpdateEvents = (dispatch, gameState, updateQueue) => {
	if (gameState.updating) {
		const renderQueue = updateBlocks(updateQueue, gameState);
		const newGameState = reaction(renderQueue, updateQueue, gameState);
		/* dispatch update block events */
		dispatch({
			type: actionTypes.EXECUTE_MOVE,
			newGameState
		});
	}

	if (gameState.updating) {
		setTimeout(() => handleUpdateEvents(dispatch, gameState, updateQueue), 500);
	} else {
		// clearInterval(interval);

		/* Update Current players total turn */
		const newPlayers = [...gameState.players];
		newPlayers[gameState.turn].turnsCount++;
		gameState.players = newPlayers;

		evaluateBoard(gameState);
		if (gameState.isGameActive) setNextPlayerTurn(gameState);

		/* remove blockClicked state */
		delete gameState.blockClicked;

		/* When updating stops dispatch next player turn */
		dispatch({
			type: actionTypes.INCREMENT_TURN,
			newGameState: gameState
		});
	}
};

/* Execute move */
export const executeMove = gameState => {
	return dispatch => {
		if (checkMoveValidity(gameState)) {
			/* Start the update procedure:
				- Set prevState for undo feature (providing ability to undo once only)
				- Set gameState to updating
				- Add the current block to a render queue along with a null object
				- set interval to call the render function
			*/

			gameState.prevState = '';
			gameState.prevState = JSON.stringify(gameState);
			gameState.updating = true;

			let updateQueue = [];
			updateQueue.push(gameState.blockClicked);
			updateQueue.push(null);

			handleUpdateEvents(dispatch, gameState, updateQueue);
		} else {
			/* dispatch error message for snackbar */
		}
	};
};

export const undoMove = () => {
	return {
		type: actionTypes.UNDO_MOVE
	};
};

const resetPlayers = players => {
	return players.map(player => ({
		...player,
		cellCount: 0,
		turnsCount: 0,
		isActive: true
	}));
};

export const resetGame = (grid, players) => {
	const homeState = {
		grid,
		numPlayers: players.length,
		playerData: resetPlayers(players)
	};

	return {
		type: actionTypes.RESET_GAME,
		newGameState: initGame(homeState)
	};
};
