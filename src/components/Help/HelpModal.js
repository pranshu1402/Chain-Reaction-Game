import React from 'react';
import Modal from '../ui/modal/Modal';

const HelpModal = props => {
	return (
		<Modal
			heading='Rules of the Game'
			isDismissRequired={true}
			shouldOpen={true}
			{...props}
		>
			<p className='description'></p>
			<ol>
				<li>All cells are initially empty.</li>
				<li>
					Players can place an atom/orb in either an empty cell or cell having
					the atoms/orbs of their own assigned color.
				</li>
				<li>
					When two or more atoms are placed in the same cell, they form a
					molecule
				</li>
				<li>
					Each cell has certain capacity to hold atoms. i.e. 4 for usual cells,
					3 for cells in the edge and 2 for cells in the corner.
				</li>
				<li>
					When a cell reaches its capacity:
					<ul>
						<li>The molecule splits.</li>
						<li>
							Adjacent cells receive one atom and gets converted to the same
							color.
						</li>
						<li>
							The explosions might result in overloading of an adjacent cell and
							the chain reaction of explosion continues until every cell is
							stable.
						</li>
					</ul>
				</li>
				<li>The winner is the one who eliminates every other player's orbs.</li>
			</ol>
		</Modal>
	);
};

export default HelpModal;
