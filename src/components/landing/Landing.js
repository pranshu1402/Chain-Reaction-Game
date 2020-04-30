import React from 'react';
import PlayerInit from '../player/PlayerInit';
import { connect } from 'react-redux';
import { SET_GAME_DETAILS, INITIALIZE_GAME } from '../../constants/ActionTypes';
import './Landing.css';

class Landing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: 8,
			numPlayers: 2,
		};
	}

	getPlayerData = (players, player) => {
		const id = `#player${player}`;
		const name = document.querySelector(`${id} .player-name`).value;
		const color = document.querySelector(`${id} .player-color`).value;
		players.push({ id, name, color, cellCount: 0, turnsCount: 0 });

		console.log(players);
		return name && color ? true : false;
	};

	handleGameStart = () => {
		console.log('/game');
		let shouldInitGame = true;
		const players = [];
		for (let i = 0; i < this.state.numPlayers; i++) {
			console.log(i);
			shouldInitGame = shouldInitGame && this.getPlayerData(players, i + 1);
		}

		if (shouldInitGame) {
			console.log(players);
			this.props.initGame({ ...this.state, players });
			this.props.history.push('/game');
		} else {
			this.props.initGame({
				...this.state,
				players: [
					{ id: 'p1', name: 'a', color: 'red' },
					{ id: 'p2', name: 'b', color: 'blue' },
				],
			});
			this.props.history.push('/game');
		}
	};

	render() {
		return (
			<div className='landing-container'>
				<p className='title'>CHAIN REACTION</p>
				<div className='form-group'>
					<label htmlFor='gridQty'>Grid:</label>
					<input
						type='number'
						id='gridQty'
						className='form-control'
						name='GridQuantity'
						placeholder='8'
						min='4'
						max='8'
					/>
					<span>Choose Grid Size Between 4-8 (Default: 8)</span>
				</div>

				<p className='description'>
					Please enter your name and choose the color to proceed.
				</p>
				<PlayerInit serial='1' />
				<PlayerInit serial='2' />
				{/* <button>ADD PLAYER</button> */}
				<button className='' onClick={this.handleGameStart}>
					START GAME
				</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onGameStartClick: data => dispatch({ type: SET_GAME_DETAILS, data }),
		initGame: data => dispatch({ type: INITIALIZE_GAME, homeState: data }),
	};
};

export default connect(null, mapDispatchToProps)(Landing);
