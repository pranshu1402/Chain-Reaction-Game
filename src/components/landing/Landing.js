import React from 'react';
import PlayerInit from '../player/PlayerInit';
import { connect } from 'react-redux';
import { SET_GAME_DETAILS } from '../../constants/ActionTypes';
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
		players.push({ id, name, color });

		console.log(players);
		return name && color ? true : false;
	};

	handleGameStart = () => {
		console.log('/game');
		let shouldInitGame = true;
		let players = [];
		for (let i = 0; i < this.state.numPlayers; i++) {
			console.log(i);
			shouldInitGame = shouldInitGame && this.getPlayerData(players, i + 1);
		}

		/* Temporary addition for debugging purpose
			Please throw error otherwise...
		*/
		if (!shouldInitGame) {
			players = [];
			players.push({ id: 'p1', name: 'a', color: 'red' });
			players.push({ id: 'p2', name: 'b', color: 'blue' });
		}

		this.props.setPlayerDetails({ ...this.state, players });
		this.props.history.push('/game');
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
						min='8'
						max='12'
					/>
					<span>Choose Grid Size Between 8-12 (Default: 8)</span>
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
		setPlayerDetails: data => dispatch({ type: SET_GAME_DETAILS, data }),
	};
};

export default connect(null, mapDispatchToProps)(Landing);
