import React from 'react';
import './Landing.css'
import PlayerInit from '../player/PlayerInit';

const Landing = () => {
	return (
		<div className="landing-container">
			<p className="title">CHAIN REACTION - 2 Player Game</p>
			<p className="description">Please enter your name and choose the color to proceed.</p>
			{/* Ask player 1 name and color */}
			<PlayerInit serial="1"/>
			<PlayerInit serial="2"/>
		</div>
	);
};

export default Landing;