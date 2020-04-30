import React from 'react';
import Block from '../block/Block';

const Board = props => {
	const blocks = [];
	for (let i = 0; i < props.grid; i++) {
		for (let j = 0; j < props.grid; j++) {
			blocks.push(props.blocks[`${i}${j}`]);
		}
	}

	return (
		<div className='game-board'>
			{blocks.map(block => (
				<Block
					blockData={block}
					color={props.color}
					grid={props.grid}
					onBlockClick={props.onBlockClick}
				/>
			))}
		</div>
	);
};

export default Board;
