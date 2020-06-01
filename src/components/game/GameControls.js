import React from 'react';
import Button from '../ui/button/Button';

const GameControls = props => {
	return (
		<div className='game-controls-container'>
			{props.controls.map(gameControl => (
				<Button
					buttonLabel={gameControl.label}
					buttonClickHandler={() =>
						gameControl.clickHandler(
							gameControl.homeStateRequired ? props.homeState : ''
						)
					}
				/>
			))}
		</div>
	);
};

export default GameControls;
