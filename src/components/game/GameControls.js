import React, { useState } from 'react';
import { connect } from 'react-redux';
import { undoMove, resetGame } from './GameActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUndo,
	faEraser,
	faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import HelpModal from '../Help/HelpModal';

const GameControls = props => {
	const [modalOpen, setModalState] = useState(false);

	return (
		<div className='game-controls-container'>
			<span
				className='game-icon-control'
				onClick={props.prevState ? props.undoMove : undefined}
			>
				<FontAwesomeIcon icon={faUndo} />
			</span>
			<span
				className='game-icon-control'
				onClick={() => props.resetGameState(props.grid, props.players)}
			>
				<FontAwesomeIcon icon={faEraser} />
			</span>
			<span className='game-icon-control' onClick={() => setModalState(true)}>
				<FontAwesomeIcon icon={faQuestionCircle} />
			</span>
			{modalOpen && <HelpModal handleModalClose={setModalState} />}
			{/* <button className='game-control'>UNDO</button>
			<button
				className='game-control'
				onClick={() => props.resetGameState(props.grid, props.players)}
			>
				RESET
			</button> */}
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
