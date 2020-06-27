import React, { useState } from 'react';

const PlayerInput = props => {
	const [name, setName] = useState(props.name);

	return (
		<div className='player-init-tile'>
			<div
				className='player-color'
				style={{ backgroundColor: props.color }}
			></div>
			<input
				type='text'
				className='form-control player-name'
				id={`player${props.serial}`}
				placeholder={`Player ${props.serial}`}
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<button className='delete'>X</button>
		</div>
	);
};

export default PlayerInput;
