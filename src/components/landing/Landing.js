import React, { useState } from 'react';
import PlayerInit from '../player/PlayerInit';
import { useDispatch } from 'react-redux';
import { initGame } from '../game/GameActions';
import { colors } from '../../constants/index';
import { INITIALIZE_GAME } from '../../constants/ActionTypes';
import './Landing.css';

const createNewPlayer = index => ({
	id: `player${index}`,
	name: '',
	color: colors[index],
	cellCount: 0,
	turnsCount: 0,
	isActive: true
});

const Landing = ({ history }) => {
	const dispatch = useDispatch();

	const [game, setGame] = useState({
		grid: 8,
		numPlayers: 2,
		playerData: [createNewPlayer(0), createNewPlayer(1)]
	});

	const updatePlayerData = (isGameStart = false) =>
		game.playerData.map((player, index) => {
			const playerInput = document.querySelector('#player' + index);
			const newPlayer = { ...player };
			newPlayer.name = playerInput.value;

			if (isGameStart && !newPlayer.name) {
				newPlayer.name = `Player ${index}`;
			}

			newPlayer.id = `player${index}`;
			newPlayer.color = colors[index];
			return newPlayer;
		});

	const handleGameStart = () => {
		dispatch({
			type: INITIALIZE_GAME,
			gameState: initGame({
				...game,
				playerData: updatePlayerData(true)
			})
		});

		history.push('/game');
	};

	const handlePlayerIncrement = () => {
		const numPlayers = game.numPlayers;
		if (numPlayers < 8) {
			const newPlayerData = updatePlayerData();
			newPlayerData.push(createNewPlayer(numPlayers));
			setGame({
				...game,
				numPlayers: numPlayers + 1,
				playerData: newPlayerData
			});
		} else {
			/* Snackbar/Toast */
		}
	};

	const handleDeletePlayer = e => {
		const index = Number(e.target.parentNode.id);
		const playerData = updatePlayerData();
		playerData.splice(index, 1);
		setGame({
			...game,
			playerData: playerData,
			numPlayers: playerData.length
		});
	};

	return (
		<div className='landing-container'>
			<p className='title'>CHAIN REACTION</p>
			{/* <div className='form-group'>
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
			</div> */}

			<PlayerInit
				playerNum={game.numPlayers}
				playerData={game.playerData}
				handleDeletePlayer={game.numPlayers === 2 ? null : handleDeletePlayer}
			/>

			<button className='game-control' onClick={handlePlayerIncrement}>
				ADD PLAYER
			</button>
			<button className='game-control' onClick={handleGameStart}>
				START GAME
			</button>
		</div>
	);
};

export default Landing;
