import React, { useState } from 'react';

const PlayerInit = props => {
	const [name, setName] = useState('');
	const [color, setColor] = useState('');

	return (
		<div className='player-init-panel' id={`player${props.serial}`}>
			<p>
				<span>Player {props.serial}</span>
				{/* <span>CPU Toggle</span> */}
			</p>
			<div className='form-group'>
				<label>Name:</label>
				<input
					type='text'
					className='form-control player-name'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</div>
			<div className='form-group'>
				<label>Color:</label>
				<input
					type='text'
					className='form-control player-color'
					value={color}
					onChange={e => setColor(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default PlayerInit;
