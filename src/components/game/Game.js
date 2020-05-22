import React, { Component } from 'react';
import Board from '../board/Board';
import { connect } from 'react-redux';
import * as actions from './GameActions';
import { canvasId, canvasDimensions } from '../../constants/index';
import './Game.css';
import GameControls from './GameControls';

class Game extends Component {
	constructor(props) {
		super(props);
		this.constants = {
			gameControls: [
				{ label: 'UNDO', clickHandler: this.props.undoMove },
				{ label: 'RESET', clickHandler: this.props.resetGame },
			],
		};
	}

	render() {
		if (!this.props.isGameStarted) {
			this.props.history.replace('/');
			return <></>;
		}

		return (
			<div className='game-container'>
				{/* Game  Status */}
				<GameControls controls={this.constants.gameControls} />
				<Board
					moveHandler={this.props.handleMove}
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
		isGameStarted: state.game.isGameStarted,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleMove: () => dispatch(actions.executeMove()),
		undoMove: () => dispatch(actions.undoMove()),
		resetGame: () => dispatch(actions.initializeGame(true)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
