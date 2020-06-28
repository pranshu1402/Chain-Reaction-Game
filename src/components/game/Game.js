import React, { Component } from 'react';
import Board from '../board/Board';
import { connect } from 'react-redux';
import * as actions from './GameActions';
import './Game.css';
import GameControls from './GameControls';

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
				<div className='game-status'>
					{isGameActive
						? status
						: (winner.name ? winner.name : winner.id) + ' Won'}
				</div>
				{/* Game Controls: UNDO RESET */}
				{/* <GameControls /> */}
				<Board
					grid={grid}
					blocks={blocks}
					color={currentColor}
					isGameActive={isGameActive}
					onBlockClick={blockClicked => {
						const gameState = {
							blockClicked,
							turn,
							color: currentColor,
							blocks,
							players,
							isGameActive
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
