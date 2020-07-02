import React from 'react';
import PlayerInput from './input/PlayerInput';
import './PlayerInit.css';

const PlayerInit = props => {
	const players = [];

	for (let i = 0; i < props.playerNum; i++) {
		players.push(
			<PlayerInput
				key={`player${i}`}
				serial={i}
				handleDeletePlayer={props.handleDeletePlayer}
				{...props.playerData[i]}
			/>
		);
	}

	return <section className='player-init-panel'>{players}</section>;
};

export default PlayerInit;
