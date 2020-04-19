import React, { Component } from 'react';
import Board from '../board/Board';
import { connect } from 'react-redux';
import './Game.css';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		if (!this.props.blocks) {
			this.props.history.replace('/');
			return;
		}
		return (
			<div className='game-container'>
				{/* Game  Status */}
				{/* Game Controls: UNDO RESET */}
				<Board
					grid={this.props.grid}
					blocks={this.props.blocks}
					color={this.props.currentColor}
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
	};
};

const mapDispatchToProps = dispatch => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
