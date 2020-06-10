import React, { Component } from 'react';
import Board from '../board/Board';
import { connect } from 'react-redux';
import * as actions from './GameActions';
import './Game.css';

class Game extends Component {
	render() {
		const {
			blocks,
			currentColor,
			turn,
			players,
			isGameActive,
			grid,
			history,
			winner,
			status
		} = this.props;

		if (!blocks) {
			history.replace('/');
			/* Return Toast : Game Not Started */
			return <div>Game not started</div>;
		}

		return (
			<div className='game-container'>
				{/* Game  Status */}
				<div className='game-status'>{isGameActive ? status : winner.name}</div>
				{/* Game Controls: UNDO RESET */}
				<Board
					grid={grid}
					blocks={blocks}
					color={currentColor}
					onBlockClick={blockClicked => {
						const gameState = {
							blockClicked,
							turn,
							color: currentColor,
							blocks,
							players
						};
						this.props.executeMove(gameState);
					}}
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
		players: state.game.players,
		isGameActive: state.game.isGameActive,
		winner: state.game.winner,
		status: state.game.status
	};
};

const mapDispatchToProps = dispatch => {
	return {
		executeMove: gameState => dispatch(actions.executeMove(gameState))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
