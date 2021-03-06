import React, { useState, useEffect } from 'react';

const PlayerInput = props => {
	const [name, setName] = useState(props.name);

	useEffect(() => {
		setName(props.name);
	}, [props.name]);

	return (
		<div className='player-init-tile' id={props.serial}>
			<div
				className='player-color'
				style={{ backgroundColor: props.color }}
			></div>
			<input
				type='text'
				className='form-control player-name'
				id={`player${props.serial}`}
				placeholder={`Player ${props.serial + 1}`}
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<button
				className='delete'
				disabled={!props.handleDeletePlayer}
				onClick={props.handleDeletePlayer}
			>
				<span></span>
			</button>
		</div>
	);
};

export default PlayerInput;
