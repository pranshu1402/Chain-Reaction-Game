import React from 'react';
import PlayerInit from '../player/PlayerInit';
import { connect } from 'react-redux';
import { initGame } from '../game/GameActions';
import { colors } from '../../constants/index';
import { INITIALIZE_GAME } from '../../constants/ActionTypes';
import './Landing.css';

class Landing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: 8,
			numPlayers: 2,
			playerData: [this.createNewPlayer(0), this.createNewPlayer(1)]
		};
	}

	createNewPlayer = index => {
		return {
			id: `player${index}`,
			name: '',
			color: colors[index],
			cellCount: 0,
			turnsCount: 0,
			isActive: true
		};
	};

	updatePlayerData = () => {
		const newPlayerData = [...this.state.playerData];
		for (const player of newPlayerData) {
			const playerInput = document.querySelector('#' + player.id);
			player.name = playerInput.value;
		}

		return newPlayerData;
	};

	handleGameStart = () => {
		this.props.initializeGame(this.state);
		this.props.history.push('/game');
	};

	handlePlayerIncrement = () => {
		const numPlayers = this.state.numPlayers;
		if (numPlayers < 8) {
			const newPlayerData = this.updatePlayerData();
			newPlayerData.push(this.createNewPlayer(numPlayers));
			this.setState({ numPlayers: numPlayers + 1, playerData: newPlayerData });
		} else {
			/* Snackbar/Toast */
		}
	};

	render() {
		return (
			<div className='landing-container'>
				<p className='title'>CHAIN REACTION</p>
				<div className='form-group'>
					<label htmlFor='gridQty'>Grid Size :</label>
					<input
						type='number'
						id='gridQty'
						className='form-control'
						name='GridQuantity'
						placeholder='8'
						min='4'
						max='8'
					/>
				</div>

				<PlayerInit
					playerNum={this.state.numPlayers}
					playerData={this.state.playerData}
				/>

				<button className='game-control' onClick={this.handlePlayerIncrement}>
					ADD PLAYER
				</button>
				<button className='game-control' onClick={this.handleGameStart}>
					START GAME
				</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		initializeGame: homeData =>
			dispatch({ type: INITIALIZE_GAME, gameState: initGame(homeData) })
	};
};

export default connect(null, mapDispatchToProps)(Landing);
