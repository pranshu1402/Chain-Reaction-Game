import React, { Component } from 'react';
import Board from '../board/Board';
import { connect } from 'react-redux';
import { EVALUATE_BOARD } from '../../constants/ActionTypes';
import { directions } from '../../constants/index';
import './Game.css';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blocks: props.blocks
		};
	}

	updateBlock = (block, color, turn, isOverlap) => {
		/* Condition to not update block on click when color is not same */
		if (!isOverlap && block.present && block.color !== color) {
			return false;
		}

		console.log('updating block', block, this.blocksToProcess);
		if (block.willSplit) {
			block.present = 0;
			block.color = '';
			block.player = '';
			block.willSplit = false;
			block.shouldSplit = true;
			if (this.blocksToProcess.length === 0) {
				this.blocksToProcess[0] = block;
			} else {
				this.blocksToProcess.push(block);
			}
			console.log(this.blocksToProcess);
		} else {
			block.present += 1;
			block.color = color;
			block.player = `p${turn}`;
			block.willSplit = block.present === block.capacity;
			block.shouldSplit = false;

			if (!isOverlap) {
				const newBlocks = { ...this.state.blocks };
				const blockId = `${block.row}${block.col}`;
				newBlocks[blockId] = block;
				console.log(newBlocks);
				this.setState({ blocks: newBlocks });
			}
		}
		return true;
	};

	calcCoordinates = (direction, block) => {
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

	handleMoleculeBurst = () => {
		console.log('in handleMolecule burst');
		const { blocks } = this.state;
		const { currentColor, turn } = this.props;
		const newBlocks = { ...blocks };
		let block = this.blocksToProcess.shift();

		while (block) {
			const id = `${block.row}${block.col}`;
			newBlocks[id] = { ...block };
			/* Update its neighbours */
			for (const index in directions) {
				const blockId = this.calcCoordinates(directions[index], block);
				const neighbour = blockId ? blocks[blockId] : null;
				if (neighbour) {
					newBlocks[id].directions.push(directions[index].direction);
					this.updateBlock(neighbour, currentColor, turn, true);
					newBlocks[blockId] = { ...neighbour };
				}
			}

			block = this.blocksToProcess.shift();
		}

		this.setState({ blocks: newBlocks });
	};

	handleBlockClick = blockId => {
		const { isGameActive, currentColor, turn } = this.props;
		const { blocks } = this.state;
		this.blocksToProcess = [];

		if (
			!isGameActive ||
			!this.updateBlock(blocks[blockId], currentColor, turn, false)
		) {
			return;
		}

		console.log('inside handleBlockClick', this.blocksToProcess);
		while (this.blocksToProcess.length !== 0) {
			this.blocksToProcess.push(null);
			console.log('in handleBlock Click');
			this.handleMoleculeBurst();
			for (let i = 0; i < 100000; i++) {}
		}

		this.props.evaluateBoard(blocks);
	};

	render() {
		const {
			blocks,
			currentColor,
			isGameActive,
			grid,
			history,
			winner
		} = this.props;
		if (!blocks) {
			history.replace('/');
			return <div>Game not started</div>;
		}

		return (
			<div className='game-container'>
				{/* Game  Status */}
				<div className='game-status'>{isGameActive ? '' : winner.name}</div>
				{/* Game Controls: UNDO RESET */}
				<Board
					grid={grid}
					blocks={this.state.blocks}
					color={currentColor}
					onBlockClick={this.handleBlockClick}
				/>
				{/* Leaderboard */}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		grid: state.game.grid,
		blocks: state.game.blocks,
		currentColor: state.game.color,
		turn: state.game.turn,
		isGameActive: state.game.isGameActive,
		winner: state.game.winner
	};
};

const mapDispatchToProps = dispatch => {
	return {
		evaluateBoard: blocks => dispatch({ type: EVALUATE_BOARD, blocks })
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
