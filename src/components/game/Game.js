import React, { Component } from 'react';
import Board from '../board/Board';
import GameControls from './GameControls';
import * as actions from './GameActions';
import { connect } from 'react-redux';
import './Game.css';

class Game extends Component {
	render() {
		const {
			blocks,
			currentColor,
			turn,
			players,
			isGameActive,
			updating,
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
					<span style={{ color: currentColor }}>
						{isGameActive
							? status
							: (winner.name ? winner.name : winner.id + 1) + ' Won'}
					</span>
					<GameControls />
				</div>
				{/* Game Controls: UNDO RESET */}
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
							grid,
							blocks,
							players,
							isGameActive
						};
						/* If game is not in the middle of updates then execute moves */
						!updating && this.props.executeMove(gameState);
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
		updating: state.game.updating,
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
