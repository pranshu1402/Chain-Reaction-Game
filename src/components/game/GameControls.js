import React from 'react';
import { connect } from 'react-redux';
import { undoMove, resetGame } from './GameActions';

const GameControls = props => {
	return (
		<div className='game-controls-container'>
			<button
				className='game-control'
				onClick={props.undoMove}
				disabled={!props.prevState}
			>
				UNDO
			</button>
			<button
				className='game-control'
				onClick={() => props.resetGameState(props.grid, props.players)}
			>
				RESET
			</button>
		</div>
	);
};

const mapStateToProps = state => ({
	grid: state.game.grid,
	players: state.game.players,
	prevState: state.game.prevState
});

const mapDispatchToProps = dispatch => ({
	undoMove: () => dispatch(undoMove()),
	resetGameState: (grid, players) => dispatch(resetGame(grid, players))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameControls);
