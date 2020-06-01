import './Game.css';
import React, { Component } from 'react';
import Board from '../board/Board';
import { connect } from 'react-redux';
import * as actions from './GameActions';
import GameControls from './GameControls';
import { canvasId, canvasDimensions } from '../../constants/index';

class Game extends Component {
	constructor(props) {
		super(props);
		this.constants = {
			gameControls: [
				{ label: 'UNDO', clickHandler: this.props.undoMove },
				{
					label: 'RESET',
					clickHandler: this.props.resetGame,
					homeStateRequired: true
				}
			]
		};
	}

	componentDidMount() {
		if (this.props.shouldGameInitiate) {
			this.props.initGame(this.props.homeState);
		}
	}

	handleCanvasClick = event => {
		let canvasBoundingRectangle = document
			.getElementById(canvasId)
			.getBoundingClientRect();
		let row = Math.floor((event.clientY - canvasBoundingRectangle.top) / 50);
		let column = Math.floor(
			(event.clientX - canvasBoundingRectangle.left) / 50
		);

		const {
			blocks,
			boardDimensions,
			currentColor,
			turn,
			players,
			handleMove
		} = this.props;
		/* Check if its a valid move */
		const blockId = `${row}${column}`;
		const block = blocks[blockId];
		if (block.present === 0 || block.color === currentColor) {
			const boardState = {
				blocks,
				color: currentColor,
				boardDimensions,
				turn,
				players
			};
			handleMove(boardState, blockId);
		} else {
			/* TODO: Show a snackbar instead of alert */
			alert('wrong move');
		}
	};

	render() {
		if (!this.props.shouldGameInitiate) {
			this.props.history.replace('/');
			return <></>;
		}

		return (
			<div className='game-container'>
				{/* Game  Status */}
				<GameControls
					controls={this.constants.gameControls}
					homeState={this.props.homeState}
				/>
				<Board
					clickHandler={this.handleCanvasClick}
					boardId={canvasId}
					canvasDimensions={canvasDimensions}
				/>
				{/* Leaderboard */}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		homeState: state.home,
		shouldGameInitiate: state.home.shouldGameInitiate,
		currentColor: state.game.color,
		boardDimensions: state.game.boardDimensions,
		blocks: state.game.blocks,
		turn: state.game.turn,
		players: state.game.players
	};
};

const mapDispatchToProps = dispatch => {
	return {
		initGame: gameDetails =>
			dispatch(actions.initializeGame(false, gameDetails)),
		handleMove: (boardState, blockId) =>
			dispatch(actions.handleMove(boardState, blockId)),
		undoMove: () => dispatch(actions.undoMove()),
		resetGame: gameDetails =>
			dispatch(actions.initializeGame(true, gameDetails))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
