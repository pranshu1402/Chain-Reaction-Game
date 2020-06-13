import { directions } from '../../constants/index';
import * as actionTypes from '../../constants/ActionTypes';

let interval;

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

/* const resetBlock = block => {
	return createNewBlock(block.row, block.col);
}; */

const setNextPlayerTurn = newState => {
	newState.turn++;
	newState.turn %= newState.players.length;
	newState.color = newState.players[newState.turn].color;
};

const evaluateBoard = gameState => {
	const newPlayers = [...gameState.players];
	for (const blockId in gameState.blocks) {
		const player = Number(gameState.blocks[blockId].player.slice(1));
		newPlayers[player].cellCount += 1;
	}

	let activePlayers = 0,
		winningCandidate = { cellCount: 0 };
	for (const player of newPlayers) {
		if (player.cellCount || !player.turnsCount) {
			activePlayers++;
			if (player.cellCount > winningCandidate.cellCount)
				winningCandidate = player;
		} else {
			player.isActive = false;
		}
	}

	if (activePlayers === 1) {
		/* Stop the game */
		return {
			...gameState,
			isGameActive: false,
			winner: winningCandidate
		};
		/* TODO: Update status & Reset block */
	} else {
		return gameState;
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

/* Update a block = increase the count of the atoms and decide if it can/will burst */
const updateBlockMolecule = (block, color, turn) => {
	console.log('updateBlockMolecule');
	if (block.willSplit) {
		block.present = 0;
		block.color = '';
		block.player = '';
		block.willSplit = false;
		block.shouldSplit = true;
	} else {
		block.present += 1;
		block.color = color;
		block.player = `p${turn}`;
		block.willSplit = block.present === block.capacity;
		block.shouldSplit = false;
	}
};

/* To react to the render queue i.e. keep updating and splitting molecules while the block is not null 
Once render Queue length reaches 0 set gameState.updating to false & clear the interval */
const reaction = (renderQueue, gameState) => {
	let currBlock = renderQueue.shift();
	console.log('reaction', currBlock);
	while (currBlock) {
		if (currBlock.shouldSplit) {
			for (const direction of directions) {
				const neighbourBlockId = calcCoordinates(direction, currBlock);
				if (neighbourBlockId) {
					currBlock.directions.push(direction);
					renderQueue.push(gameState.blocks[neighbourBlockId]);
				}
			}
		}
		currBlock = renderQueue.shift();
		console.log('reactionIn', currBlock);
	}

	if (renderQueue.length) {
		renderQueue.push(null);
		return true;
	} else {
		return false;
	}
};

/* To react to the render queue i.e. keep updating and splitting molecules while the block is not null 
Once render Queue length reaches 0 set gameState.updating to false & clear the interval */
const updateBlocks = (renderQueue, gameState) => {
	let counter = 0,
		currBlock = renderQueue[counter];

	const newBlocks = { ...gameState.blocks };
	while (currBlock) {
		counter++;
		updateBlockMolecule(currBlock, gameState.color, gameState.turn);
		newBlocks[currBlock.id] = { ...currBlock };
		currBlock = renderQueue[counter];
	}

	return newBlocks;
};

const handleUpdateEvents = (dispatch, gameState, renderQueue) => {
	if (gameState.updating) {
		gameState.blocks = updateBlocks(renderQueue, gameState);
		/* dispatch update block events */
		dispatch({ type: actionTypes.EXECUTE_MOVE, newGameState: gameState });
		gameState.updating = reaction(renderQueue, gameState);
	} else {
		clearInterval(interval);

		/* Update Current players total turn */
		const newPlayers = [...gameState.players];
		newPlayers[gameState.turn].turnsCount++;
		gameState.players = newPlayers;

		evaluateBoard(gameState);
		setNextPlayerTurn(gameState);

		/* When updating stops dispatch next player turn */
		dispatch({
			type: actionTypes.INCREMENT_TURN,
			newGameState: gameState
		});
	}
};

/* Execute move */
export const executeMove = gameState => {
	console.log('executing move');
	return dispatch => {
		if (checkMoveValidity(gameState)) {
			/* Start the update procedure:
			- Set gameState to updating
			- Add the current block to a render queue along with a null object
			- set interval to call the render function
		*/
			gameState.updating = true;
			let renderQueue = [];
			renderQueue.push(gameState.blockClicked);
			renderQueue.push(null);

			handleUpdateEvents(dispatch, gameState, renderQueue);

			/* render reaction after each renderInterval */
			interval = setInterval(
				() => handleUpdateEvents(dispatch, gameState, renderQueue),
				260
			);
		} else {
			/* dispatch error message for snackbar */
		}
	};
};
