import React from 'react';
import Modal from '../ui/modal/Modal';

const HelpModal = props => {
	return (
		<Modal
			heading='Rules of the Game'
			isDismissRequired={true}
			shouldOpen={true}
			handleModalClose={props.handleModalClose}
			{...props}
		>
			<p className='description'></p>
			<ol>
				<li>Each player is assigned a color initially</li>
				<li>
					Players can only place a sphere in an empty block or the one filled
					with their assigned colored spheres.
				</li>
				<li>
					When two or more spheres are placed together in the same block, they
					collates and becomes unstable.
				</li>
				<li>
					Each block has certain capacity to contain these spheres at a time.
					i.e. Blocks in the corners can only handle 1 sphere. Blocks at the
					grid edges other than corners can hold 2 spheres and Rest of the
					blocks can contain upto 3 spheres.
				</li>
				<li>
					When a player tries to insert more sphere than the block capacity:
					<ul>
						<li>{`The unstable spheres reacts & explodes.`}</li>
						<li>
							{`Each adjacent blocks receives a sphere, existing sphere gets
							overlapped & converted to the same color.`}
						</li>
						<li>
							The explosions might result in overloading of the adjacent blocks
							and the chain reaction of explosion continues until every block
							becomes stable.
						</li>
					</ul>
				</li>
				<li>The winner is the one who eliminates every other player's orbs.</li>
			</ol>
		</Modal>
	);
};

export default HelpModal;
