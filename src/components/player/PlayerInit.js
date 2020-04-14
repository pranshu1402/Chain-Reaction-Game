import React from 'react';

const PlayerInit = props => {
	return (
		<div>
			<p>
				<span>Player {props.serial}</span>
				<span>CPU Toggle{/* CPU player toggle */} </span>
			</p>
			<div>
				<label>Name: <input type="text"/></label>
			</div>
			<div>
				<label>Color: <input type="text"/></label>
			</div>
		</div>
	);
};

export default PlayerInit;